import { GoogleGenerativeAI } from '@google/generative-ai'
import chatData from '../utils/chatData.js'

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

// Store conversation history
const conversationHistory = new Map()

// Function to find matching response from chatData with improved keyword matching
const findResponse = (message) => {
  const lowercaseMessage = message.toLowerCase()
  
  // Check for multiple matches and find the best one
  let bestMatch = null
  let bestMatchScore = 0
  
  for (const [category, data] of Object.entries(chatData)) {
    if (data.keywords) {
      // Check if any keyword is included in the message
      const matchingKeywords = data.keywords.filter(keyword => 
        lowercaseMessage.includes(keyword.toLowerCase())
      )
      
      // Calculate match score based on number and specificity of matching keywords
      if (matchingKeywords.length > 0) {
        // Calculate score based on number of matching keywords and their specificity
        const score = matchingKeywords.reduce((total, keyword) => {
          // Longer keywords are more specific and should have higher weight
          return total + (keyword.length * 0.5) 
        }, matchingKeywords.length)
        
        // Update best match if current score is higher
        if (score > bestMatchScore) {
          bestMatchScore = score
          bestMatch = data.response
        }
      }
    }
  }
  
  // Return best match or default response
  return bestMatch || chatData.default.response
}

// Function to format response with markdown for better presentation
const formatResponse = (response) => {
  // Add markdown formatting to improve readability
  // Replace bullet points with proper markdown
  let formattedResponse = response
    .replace(/(\d+\.\s)/g, '\n$1') // Number lists
    .replace(/(\n|^)[-•]\s/g, '\n- ') // Bullet points
  
  return formattedResponse
}

// Function to get conversation context
const getConversationContext = (sessionId) => {
  if (!sessionId) {
    console.warn('No sessionId provided for conversation context')
    return []
  }
  
  const history = conversationHistory.get(sessionId) || []
  console.log(`Retrieved ${history.length} messages for session ${sessionId}`)
  return history
}

// Function to update conversation context
const updateConversationContext = (sessionId, message, response) => {
  if (!sessionId) {
    console.warn('No sessionId provided for updating conversation context')
    return
  }
  
  const history = getConversationContext(sessionId)
  history.push({ role: 'user', content: message })
  history.push({ role: 'assistant', content: response })
  
  console.log(`Updated conversation history for ${sessionId}, new length: ${history.length}`)
  conversationHistory.set(sessionId, history)
  
  // Limit history to last 10 messages to prevent memory issues
  if (history.length > 10) {
    conversationHistory.set(sessionId, history.slice(-10))
  }
}

// Chat response controller
const getChatResponse = async (req, res) => {
  try {
    const { message, sessionId } = req.body

    if (!message) {
      return res.status(400).json({
        success: false,
        message: 'Message is required'
      })
    }

    if (!sessionId) {
      console.warn('Request missing sessionId, conversation context cannot be maintained')
    }

    // Get conversation history
    const history = getConversationContext(sessionId)
    
    // Check for short responses that might need context (like "yes", "no", "tell me more")
    const isShortResponse = message.trim().length < 5
    const hasExistingContext = history.length > 0
    
    // Short responses like "yes" need the previous context to be meaningful
    if (isShortResponse && hasExistingContext) {
      console.log('Short response detected, using Gemini for contextual understanding')
      // Skip predefined responses for short follow-ups and use the AI model
      try {
        return await handleGeminiResponse(message, sessionId, res)
      } catch (error) {
        console.error('Gemini API Error for short response:', error)
        // Fallback to a generic "need more info" response
        const fallbackResponse = "I noticed your message was brief. To provide you with the most helpful information, could you please share a bit more about what specific aspect of women's health you'd like to know about?"
        
        // Update conversation context with the fallback
        updateConversationContext(sessionId, message, fallbackResponse)
        
        return res.status(200).json({
          success: true,
          data: fallbackResponse
        })
      }
    }

    // First check predefined responses
    const predefinedResponse = findResponse(message)
    const formattedPredefinedResponse = formatResponse(predefinedResponse)

    // If no predefined response matches, use Gemini
    if (predefinedResponse === chatData.default.response) {
      try {
        return await handleGeminiResponse(message, sessionId, res)
      } catch (error) {
        console.error('Gemini API Error:', error)
        // Fallback to default response if Gemini fails
        updateConversationContext(sessionId, message, formattedPredefinedResponse)
        
        return res.status(200).json({
          success: true,
          data: formattedPredefinedResponse
        })
      }
    }

    // For predefined responses, still update the conversation history
    updateConversationContext(sessionId, message, formattedPredefinedResponse)
    
    // Return predefined response
    res.status(200).json({
      success: true,
      data: formattedPredefinedResponse
    })

  } catch (error) {
    console.error('Chat Controller Error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    })
  }
}

// Helper function to handle Gemini API calls
const handleGeminiResponse = async (message, sessionId, res) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
  
  // Get conversation history
  const history = getConversationContext(sessionId)
  
  // Create context from history
  const context = history.map(msg => 
    `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
  ).join('\n')

  console.log(`Sending message to Gemini with ${history.length} previous messages for context`)

  const prompt = `
    You are a medical assistant chatbot specialized in infertility, gynecology, and obstetrics.
    Your role is to provide detailed medical information and support.

    Previous conversation context:
    ${context}

    Current user message: ${message}

    GUIDELINES:
    1. Scope of Practice:
       - Focus on women's health, infertility, gynecology, and obstetrics
       - Provide comprehensive information about conditions and treatments
       - Include relevant statistics and success rates
       - Explain medical procedures and processes in detail

    2. Information to Include:
       - Detailed explanations of medical conditions
       - Available treatment options and their processes
       - Success rates and statistics where applicable
       - Common symptoms and their management
       - Lifestyle factors and their impact
       - Recent medical advancements and research

    3. Response Structure:
       - Start with a clear explanation of the topic
       - Include relevant medical details and statistics
       - Explain treatment options and their processes
       - Provide context about success rates and outcomes
       - End with additional resources or next steps

    4. Common Topics:
       a) Infertility and Fertility Treatments:
          - Detailed explanation of IVF, IUI, and other ART procedures
          - Success rates and factors affecting outcomes
          - Pre-treatment evaluations and preparations
          - Post-treatment care and follow-up

       b) Pregnancy and Prenatal Care:
          - Detailed stages of pregnancy and fetal development
          - Common symptoms and their management
          - Prenatal testing and screening options
          - High-risk pregnancy factors and management
          - Delivery options and preparation

       c) Gynecological Conditions:
          - Detailed explanation of common conditions
          - Diagnostic procedures and their purposes
          - Treatment options and their effectiveness
          - Long-term management strategies
          - Impact on fertility and pregnancy

       d) Menstrual Health:
          - Normal cycle variations and patterns
          - Common disorders and their management
          - Impact on fertility and overall health
          - Treatment options and their effectiveness

       e) PCOS and Endometriosis:
          - Detailed explanation of these conditions
          - Latest research and understanding
          - Medical and surgical treatment approaches
          - Lifestyle management strategies
          - Impact on fertility and long-term health

       f) Contraception and Family Planning:
          - Detailed information about different methods
          - Effectiveness rates and considerations
          - Side effects and benefits of each option
          - Long-term implications for fertility

    5. Emergency Information:
       - Explain when to seek immediate medical attention
       - Describe emergency conditions and their symptoms
       - Provide guidance on emergency response
       - Include information about emergency procedures

    6. Format your response with proper markdown:
       - Use bold for important points
       - Use bullet points for lists
       - Include headings for sections
       - Keep paragraphs short and focused

    7. If the user sends a short message like "yes", "no", "tell me more", use the conversation context to understand what they are asking about. If they asked about a topic like endometriosis and then said "yes", assume they want detailed information about endometriosis.

    8. Always maintain the conversation flow and context.

    9. IMPORTANT: At the end of EVERY response, include this exact disclaimer:
       "*MEDICAL DISCLAIMER: This information is for educational purposes only and not a substitute for professional medical advice. For personalized care, please consult with Dr. Aishwarya Parthasarathy, our fertility specialist, by calling +91 9342521779 or visiting our clinic at No.24 Chowdhary Nagar Main Road, Valasaravakkam, Chennai - 87.*"

    10. About the doctor:
        Dr. Aishwarya Parthasarathy is a Gynecologist and fertility specialist based in Chennai. She completed postgraduation from AIIMS, New Delhi, senior residency at JIPMER, Pondicherry, and FNB in reproductive medicine. She also holds MRCOG from the UK. With years of experience and international publications, she is passionate about fertility, laparoscopy, ultrasound, and high-risk pregnancies.

    Please provide a detailed response that takes into account the previous conversation context and addresses the user's current question.
    Make sure your response is formatted with proper markdown for readability.
    Always end with the medical disclaimer.
  `

  const result = await model.generateContent(prompt)
  const response = result.response.text()

  // Update conversation history
  updateConversationContext(sessionId, message, response)

  return res.status(200).json({
    success: true,
    data: response
  })
}

export { getChatResponse }