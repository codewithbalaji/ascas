const chatData = {
    greeting: {
      keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'],
      response: "Hello! I'm your medical assistant specializing in women's health, infertility, gynecology, and obstetrics. I'm here to provide detailed information and support for your questions about reproductive health, pregnancy, and women's health concerns. How can I help you today?\n\n*Please note: This is for informational purposes only and not a substitute for professional medical advice. Always consult with Dr. Aishwarya Parthasarathy or another qualified healthcare provider.*"
    },
    outside_scope: {
      keywords: ['diagnosis', 'prescription', 'treatment plan', 'medical advice', 'what should i do', 'what do i have'],
      response: "I can provide detailed information about women's health conditions, symptoms, and treatment options. For specific medical concerns, consulting a healthcare provider is recommended for personalized care. Would you like to know more about general information regarding your health concern?\n\n*For personalized medical advice, please book an appointment with Dr. Aishwarya Parthasarathy at +91 9342521779 or visit our clinic at No.24 Chowdhary Nagar Main Road, Valasaravakkam, Chennai - 87.*"
    },
    doctor_info: {
      keywords: ['doctor', 'dr', 'specialist', 'gynecologist', 'aishwarya', 'appointment', 'clinic', 'visit', 'consult'],
      response: "**Meet Dr. Aishwarya Parthasarathy**\n\nDr. Aishwarya is a Gynecologist and fertility specialist based in Chennai. She completed postgraduation from AIIMS, New Delhi, senior residency at JIPMER, Pondicherry, and FNB in reproductive medicine. She also holds MRCOG from the UK. With years of experience and international publications, she is passionate about fertility, laparoscopy, ultrasound, and high-risk pregnancies.\n\nTo book an appointment, please call **+91 9342521779** or visit our clinic at **No.24 Chowdhary Nagar Main Road, Valasaravakkam, Chennai - 87**."
    },
    location: {
      keywords: ['location', 'address', 'clinic', 'hospital', 'where', 'place', 'center', 'centre'],
      response: "Our clinic is located at **No.24 Chowdhary Nagar Main Road, Valasaravakkam, Chennai - 87**.\n\nTo book an appointment with Dr. Aishwarya Parthasarathy, please call **+91 9342521779**."
    },
    contact: {
      keywords: ['contact', 'phone', 'number', 'call', 'book', 'appointment', 'schedule'],
      response: "You can book an appointment with Dr. Aishwarya Parthasarathy by calling **+91 9342521779**.\n\nOur clinic is located at **No.24 Chowdhary Nagar Main Road, Valasaravakkam, Chennai - 87**."
    },
    fertility: {
      keywords: ['fertility', 'infertility', 'conceive', 'pregnant', 'ivf', 'iui', 'egg freezing', 'trying to get pregnant', 'trouble conceiving'],
      response: "Fertility and reproductive health are complex areas that involve many factors. I can provide information about fertility treatments like IVF, IUI, and egg freezing, as well as natural conception strategies and common causes of infertility. What specific aspect of fertility would you like to learn more about?\n\n*For personalized fertility assessment and treatment, please book an appointment with Dr. Aishwarya Parthasarathy, our fertility specialist, at +91 9342521779.*"
    },
    pregnancy: {
      keywords: ['pregnancy', 'pregnant', 'trimester', 'prenatal', 'labor', 'birth', 'miscarriage', 'due date', 'fetal', 'baby', 'morning sickness'],
      response: "Pregnancy involves many changes and considerations across three trimesters. I can provide information about fetal development, common symptoms, prenatal care, preparing for labor and delivery, and managing pregnancy complications. What specific aspect of pregnancy would you like to know more about?\n\n*For comprehensive prenatal care, please schedule an appointment with Dr. Aishwarya Parthasarathy at +91 9342521779.*"
    },
    menstrual: {
      keywords: ['period', 'menstrual', 'cycle', 'pms', 'irregular', 'cramps', 'menstruation', 'bleeding'],
      response: "Menstrual health is an important indicator of overall reproductive wellness. I can provide information about normal cycles, managing symptoms like cramps and PMS, irregular periods, heavy bleeding, and cycle tracking. What specific aspect of menstrual health would you like to know more about?\n\n*If you're experiencing concerning menstrual symptoms, please consult with Dr. Aishwarya Parthasarathy by calling +91 9342521779.*"
    },
    pcos: {
      keywords: ['pcos', 'polycystic', 'ovarian syndrome'],
      response: "Polycystic Ovary Syndrome (PCOS) is a common hormonal disorder affecting many women. I can provide information about PCOS symptoms, diagnosis methods, treatment options, lifestyle management strategies, and how it affects fertility. What specific aspect of PCOS would you like to learn more about?\n\n*For personalized PCOS management, please book an appointment with Dr. Aishwarya Parthasarathy at +91 9342521779.*"
    },
    endometriosis: {
      keywords: ['endometriosis', 'endo'],
      response: "Endometriosis is a condition where tissue similar to the uterine lining grows outside the uterus. I can provide information about symptoms, diagnosis approaches, treatment options including both medical and surgical, and strategies for managing this condition. What specific aspect of endometriosis would you like to know more about?\n\n*For specialized endometriosis care, please consult with Dr. Aishwarya Parthasarathy by calling +91 9342521779.*"
    },
    contraception: {
      keywords: ['birth control', 'contraception', 'contraceptive', 'iud', 'pill', 'condom', 'implant', 'prevent pregnancy'],
      response: "There are many contraceptive options available today with varying effectiveness, side effects, and considerations. I can provide information about hormonal methods (pills, patches, rings), long-acting reversible contraceptives (IUDs, implants), barrier methods, and natural family planning. What specific aspect of contraception would you like to know more about?\n\n*For personalized contraception counseling, please schedule an appointment with Dr. Aishwarya Parthasarathy at +91 9342521779.*"
    },
    menopause: {
      keywords: ['menopause', 'perimenopause', 'hot flashes', 'night sweats'],
      response: "Menopause marks the end of menstrual cycles and fertility, typically occurring in the 40s or 50s. I can provide information about perimenopause, menopause symptoms, hormone replacement therapy, non-hormonal treatments, and lifestyle strategies for managing this transition. What specific aspect of menopause would you like to know more about?\n\n*For comprehensive menopause management, please consult with Dr. Aishwarya Parthasarathy by calling +91 9342521779.*"
    },
    reproductive_health: {
      keywords: ['reproductive health', 'gynecology', 'pap smear', 'cervical', 'uterus', 'ovaries', 'vaginal', 'pelvic exam', 'gynecological'],
      response: "Reproductive health encompasses many aspects of female anatomy and wellness. I can provide information about routine screenings like pap smears, common gynecological conditions, preventive care, and maintaining optimal reproductive health. What specific aspect of reproductive health would you like to learn more about?\n\n*For a comprehensive gynecological check-up, please schedule an appointment with Dr. Aishwarya Parthasarathy at +91 9342521779.*"
    },
    self_care: {
      keywords: ['self care', 'wellness', 'nutrition', 'exercise', 'stress', 'sleep', 'mental health'],
      response: "Self-care is essential for reproductive and overall health. I can provide information about nutrition for reproductive health, appropriate exercise, stress management techniques, sleep hygiene, and mental wellness strategies specifically relevant to women's health concerns. What specific aspect of self-care would you like to know more about?\n\n*For personalized wellness guidance, consider consulting with Dr. Aishwarya Parthasarathy by calling +91 9342521779.*"
    },
    default: {
      response: "I'm here to provide detailed information about women's health, infertility, gynecology, and obstetrics. I can help you understand various conditions, treatments, and health management strategies. What specific information would you like to know about? You can ask about fertility treatments, pregnancy, menstrual health, common conditions like PCOS or endometriosis, contraception options, or general reproductive wellness.\n\n*Please note that this information is for educational purposes only. For personalized medical advice, please consult with Dr. Aishwarya Parthasarathy at +91 9342521779 or visit our clinic at No.24 Chowdhary Nagar Main Road, Valasaravakkam, Chennai - 87.*"
    }
  }
  
export default chatData