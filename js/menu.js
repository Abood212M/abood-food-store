/* =====================================================================
   Abood Food Store — ملف البيانات
   ✅ ده الملف الوحيد اللي بتعدّل فيه: الأصناف، الأسعار، العروض، المواعيد
   ⚠️ خلي بالك من الفواصل (,) والأقواس — أي غلطة هتخلي الصفحة فاضية
   ===================================================================== */
window.STORE = {
  name: "Abood Food Store",
  tagline: { ar: "شاورما سوري • برجر • وجبات — اطلب مباشرة بدون عمولة", en: "Syrian shawarma • Burgers • Meals — order direct" },
  currency: { ar: "ج.م", en: "EGP" },

  // مواعيد العمل بتوقيت القاهرة (لو بيقفل بعد نص الليل عادي)
  hours: { open: "12:00", close: "03:00", timezone: "Africa/Cairo", alwaysOpen: false },

  freeDeliveryOver: 600,   // توصيل مجاني فوق المبلغ ده (حط 0 لإلغائه)
  credit: { text: "Designed by AM Beyond Impossible" },

  // الفروع ومناطق التوصيل — غيّر أسماء المناطق لأسماء حقيقية
  branches: [
    {
      id: "main", ar: "الفرع الرئيسي", en: "Main branch",
      whatsapp: "201555974185",   // 20 + الرقم من غير أول صفر
      zones: [
        { ar: "استلام من المطعم", en: "Pickup from store", fee: 0, pickup: true },
        { ar: "منطقة 1 — قريب جداً (حتى 2 كم)", en: "Zone 1 — up to 2 km", fee: 20 },
        { ar: "منطقة 2 — من 2 لـ 4 كم", en: "Zone 2 — 2 to 4 km", fee: 30 },
        { ar: "منطقة 3 — من 4 لـ 6 كم", en: "Zone 3 — 4 to 6 km", fee: 40 },
        { ar: "منطقة 4 — من 6 لـ 8 كم", en: "Zone 4 — 6 to 8 km", fee: 50 },
        { ar: "منطقة 5 — من 8 لـ 10 كم", en: "Zone 5 — 8 to 10 km", fee: 60 }
      ]
    }
    // فرع تاني؟ حط فاصلة بعد القوس اللي فوق ده، وشيل علامات // من السطور دي:
    // { id: "b2", ar: "فرع التجمع", en: "Tagamoa branch", whatsapp: "2010XXXXXXXX",
    //   zones: [ { ar: "استلام من الفرع", en: "Pickup", fee: 0, pickup: true }, { ar: "منطقة 1", en: "Zone 1", fee: 20 } ] }
  ],

  // أكواد الخصم (ملحوظة: الأكواد بتبان لأي حد يفتح كود الصفحة، فاستخدمها كعروض مش كأسرار)
  coupons: [
    { code: "ABOOD10", type: "percent", value: 10, min: 300, maxDiscount: 100 },
    { code: "WELCOME50", type: "fixed", value: 50, min: 400 }
  ],

  // العروض — الصورة رقم 1 للعرض الأول في images/offers/1.webp وهكذا. item = رقم الصنف اللي يفتح لما يدوس
  offers: [
    { emoji: "🍱", item: 14, tag: { ar: "عرض العيلة", en: "Family deal" }, title: { ar: "بوكس العيلة بـ 799 بدل 950", en: "Family Box: 799 instead of 950" }, sub: { ar: "4 عربي فراخ + بطاطس عائلي + ثومية + لتر بيبسي", en: "4 chicken arabi + family fries + garlic + 1L Pepsi" } },
    { emoji: "🍔", item: 20, tag: { ar: "جديد", en: "New" }, title: { ar: "أبود سبيشال بـ 290 بدل 330", en: "Abood Special: 290 instead of 330" }, sub: { ar: "3 طبقات لحم وصوص الشيف السري", en: "Triple beef with the chef's secret sauce" } },
    { emoji: "🎟️", tag: { ar: "كود خصم", en: "Promo code" }, title: { ar: "خصم 10% بكود ABOOD10", en: "10% off with ABOOD10" }, sub: { ar: "على الطلبات فوق 300 ج.م", en: "On orders above 300 EGP" } },
    { emoji: "🌯", item: 7, tag: { ar: "الأكثر طلباً", en: "Best seller" }, title: { ar: "عربي شاورما فراخ بـ 165 بدل 190", en: "Chicken Arabi: 165 instead of 190" }, sub: { ar: "مقطّع مع بطاطس وثومية ومخلل", en: "Cut wrap with fries, garlic & pickles" } },
    { emoji: "🛵", tag: { ar: "توصيل", en: "Delivery" }, title: { ar: "توصيل مجاني فوق 600 ج.م", en: "Free delivery over 600 EGP" }, sub: { ar: "لكل المناطق", en: "To all zones" } }
  ],

  categories: [
    { id: "shawarma", icon: "🌯", ar: "شاورما سوري", en: "Syrian Shawarma" },
    { id: "arabi", icon: "🍽️", ar: "عربي ووجبات", en: "Arabi & Meals" },
    { id: "burger", icon: "🍔", ar: "برجر", en: "Burgers" },
    { id: "chicken", icon: "🍗", ar: "فراخ مقرمشة", en: "Crispy Chicken" },
    { id: "manakish", icon: "🥙", ar: "مناقيش وفطاير", en: "Manakish & Pies" },
    { id: "apps", icon: "🧆", ar: "مقبلات وإضافات", en: "Sides & Extras" },
    { id: "salads", icon: "🥗", ar: "سلطات", en: "Salads" },
    { id: "desserts", icon: "🍰", ar: "حلويات", en: "Desserts" },
    { id: "drinks", icon: "🥤", ar: "مشروبات", en: "Drinks" }
  ],

  // الأحجام: add = الزيادة على السعر الأساسي
  sizeSets: {
    sh: { title: { ar: "الحجم", en: "Size" }, opts: [ { ar: "عادي", en: "Regular", add: 0 }, { ar: "كبير", en: "Large", add: 30 }, { ar: "سوبر", en: "Super", add: 55 } ] },
    bg: { title: { ar: "عدد الطبقات", en: "Patties" }, opts: [ { ar: "سنجل", en: "Single", add: 0 }, { ar: "دبل", en: "Double", add: 70 }, { ar: "تريبل", en: "Triple", add: 130 } ] },
    fr: { title: { ar: "الحجم", en: "Size" }, opts: [ { ar: "صغير", en: "Small", add: 0 }, { ar: "وسط", en: "Medium", add: 15 }, { ar: "كبير", en: "Large", add: 30 } ] },
    ms: { title: { ar: "النكهة", en: "Flavor" }, opts: [ { ar: "فانيليا", en: "Vanilla", add: 0 }, { ar: "شوكولاتة", en: "Chocolate", add: 0 }, { ar: "فراولة", en: "Strawberry", add: 0 }, { ar: "لوتس", en: "Lotus", add: 15 }, { ar: "أوريو", en: "Oreo", add: 15 } ] }
  },

  // الإضافات: max = أقصى عدد إضافات
  addonSets: {
    sh: { max: 5, opts: [
      { ar: "حوّلها وجبة (بطاطس + كانز)", en: "Make it a meal (fries + can)", price: 60 },
      { ar: "ثومية زيادة", en: "Extra garlic sauce", price: 10 },
      { ar: "جبنة موتزاريلا", en: "Mozzarella", price: 20 },
      { ar: "بطاطس جوه الساندوتش", en: "Fries inside", price: 15 },
      { ar: "سبايسي 🌶️", en: "Make it spicy 🌶️", price: 0 }
    ] },
    bg: { max: 6, opts: [
      { ar: "حوّلها وجبة (بطاطس + كانز)", en: "Make it a meal (fries + can)", price: 60 },
      { ar: "شريحة شيدر", en: "Cheddar slice", price: 20 },
      { ar: "بيف بيكون", en: "Beef bacon", price: 35 },
      { ar: "مشروم سوتيه", en: "Sautéed mushroom", price: 25 },
      { ar: "هالبينو", en: "Jalapeño", price: 15 },
      { ar: "بصل مكرمل", en: "Caramelized onion", price: 15 },
      { ar: "صوص إضافي", en: "Extra sauce", price: 10 }
    ] }
  },

  /* الأصناف — كل صنف:
     id: رقم الصنف (= اسم صورته)   cat: القسم   ar/en: الاسم   dar/den: الوصف
     price: السعر   old: السعر قبل الخصم (اختياري)   sizes/add: الأحجام والإضافات (اختياري)
     best: true = يظهر في الأكثر طلباً   off: true = غير متاح مؤقتاً */
  items: [
    { id: 1, cat: "shawarma", ar: "شاورما فراخ سوري", en: "Syrian Chicken Shawarma", dar: "عيش صاج، ثومية، مخلل وبطاطس", den: "Saj bread, garlic sauce, pickles & fries", price: 95, sizes: "sh", add: "sh", best: true },
    { id: 2, cat: "shawarma", ar: "شاورما لحمة سوري", en: "Syrian Beef Shawarma", dar: "لحمة متبلة، طحينة، بقدونس وبصل", den: "Marinated beef, tahini, parsley & onion", price: 140, sizes: "sh", add: "sh", best: true },
    { id: 3, cat: "shawarma", ar: "شاورما فراخ دبل تشيز", en: "Double Cheese Chicken Shawarma", dar: "فراخ مع موتزاريلا وشيدر سايحة", den: "Chicken with melted mozzarella & cheddar", price: 125, sizes: "sh", add: "sh" },
    { id: 4, cat: "shawarma", ar: "شاورما ميكس", en: "Mixed Shawarma", dar: "فراخ ولحمة مع ثومية وطحينة", den: "Chicken & beef with garlic & tahini", price: 150, sizes: "sh", add: "sh" },
    { id: 5, cat: "shawarma", ar: "شاورما سبايسي", en: "Spicy Shawarma", dar: "فراخ بصوص الشطة السوري والهالبينو", den: "Chicken, Syrian chili sauce & jalapeño", price: 105, sizes: "sh", add: "sh" },
    { id: 6, cat: "shawarma", ar: "صاروخ شاورما", en: "Shawarma Rocket", dar: "رول طويل 40 سم محشي فراخ وبطاطس", den: "40 cm roll loaded with chicken & fries", price: 175, add: "sh" },

    { id: 7, cat: "arabi", ar: "عربي شاورما فراخ", en: "Chicken Shawarma Arabi", dar: "ساندوتش مقطّع، بطاطس، ثومية ومخلل", den: "Cut wrap, fries, garlic & pickles", price: 165, old: 190, best: true },
    { id: 8, cat: "arabi", ar: "عربي شاورما لحمة", en: "Beef Shawarma Arabi", dar: "ساندوتش مقطّع، بطاطس، طحينة ومخلل", den: "Cut wrap, fries, tahini & pickles", price: 210 },
    { id: 9, cat: "arabi", ar: "وجبة شاورما فراخ", en: "Chicken Shawarma Meal", dar: "2 ساندوتش + بطاطس + ثومية + كانز", den: "2 wraps + fries + garlic + can", price: 210, best: true },
    { id: 10, cat: "arabi", ar: "وجبة شاورما لحمة", en: "Beef Shawarma Meal", dar: "2 ساندوتش + بطاطس + طحينة + كانز", den: "2 wraps + fries + tahini + can", price: 280 },
    { id: 11, cat: "arabi", ar: "فتة شاورما فراخ", en: "Chicken Shawarma Fatteh", dar: "عيش محمص، رز، فراخ، ثومية ودبس رمان", den: "Toasted bread, rice, chicken, garlic & pomegranate", price: 170 },
    { id: 12, cat: "arabi", ar: "فتة شاورما لحمة", en: "Beef Shawarma Fatteh", dar: "عيش محمص، رز، لحمة وطحينة", den: "Toasted bread, rice, beef & tahini", price: 220 },
    { id: 13, cat: "arabi", ar: "صحن شاورما فراخ", en: "Chicken Shawarma Plate", dar: "فراخ، رز بسمتي، سلطة، ثومية وعيش", den: "Chicken, basmati rice, salad, garlic & bread", price: 230 },
    { id: 14, cat: "arabi", ar: "بوكس العيلة", en: "Family Box", dar: "4 عربي فراخ + بطاطس عائلي + ثومية + لتر بيبسي", den: "4 chicken arabi + family fries + garlic + 1L Pepsi", price: 799, old: 950, best: true },

    { id: 15, cat: "burger", ar: "كلاسيك برجر", en: "Classic Burger", dar: "لحم بلدي 150 جم، شيدر، خس، طماطم وصوص البيت", den: "150g beef, cheddar, lettuce, tomato & house sauce", price: 155, sizes: "bg", add: "bg", best: true },
    { id: 16, cat: "burger", ar: "سماش برجر", en: "Smash Burger", dar: "شريحتين سماش مقرمشين، شيدر وبصل", den: "Two crispy smashed patties, cheddar & onion", price: 185, sizes: "bg", add: "bg", best: true },
    { id: 17, cat: "burger", ar: "مشروم سويس", en: "Mushroom Swiss", dar: "مشروم سوتيه، جبنة سويسري وصوص كريمي", den: "Sautéed mushroom, Swiss cheese & creamy sauce", price: 210, sizes: "bg", add: "bg" },
    { id: 18, cat: "burger", ar: "باربكيو برجر", en: "BBQ Burger", dar: "صوص باربكيو مدخن، بيف بيكون وحلقات بصل", den: "Smoky BBQ sauce, beef bacon & onion rings", price: 215, sizes: "bg", add: "bg" },
    { id: 19, cat: "burger", ar: "هالبينو برجر", en: "Jalapeño Burger", dar: "هالبينو، شيدر حار وصوص شيبوتلي", den: "Jalapeño, pepper cheddar & chipotle sauce", price: 200, sizes: "bg", add: "bg" },
    { id: 20, cat: "burger", ar: "أبود سبيشال", en: "Abood Special", dar: "3 طبقات لحم، صوص الشيف وبصل مكرمل", den: "Triple beef, chef's sauce & caramelized onion", price: 290, old: 330, add: "bg", best: true },
    { id: 21, cat: "burger", ar: "تشيكن برجر كريسبي", en: "Crispy Chicken Burger", dar: "صدر فراخ مقرمش، كول سلو وصوص رانش", den: "Crispy chicken breast, coleslaw & ranch", price: 165, add: "bg" },
    { id: 22, cat: "burger", ar: "برجر أطفال", en: "Kids Burger", dar: "برجر صغير + بطاطس + عصير", den: "Mini burger + fries + juice", price: 120 },

    { id: 23, cat: "chicken", ar: "وجبة كريسبي 3 قطع", en: "Crispy Meal 3 pcs", dar: "3 قطع فراخ، بطاطس، كول سلو وعيش", den: "3 pcs chicken, fries, coleslaw & bun", price: 190, best: true },
    { id: 24, cat: "chicken", ar: "تشيكن ستربس 5 قطع", en: "Chicken Strips 5 pcs", dar: "مع صوص هوني ماسترد", den: "With honey mustard", price: 175 },
    { id: 25, cat: "chicken", ar: "زنجر ساندوتش", en: "Zinger Sandwich", dar: "فيليه حار مقرمش، خس ومايونيز", den: "Spicy crispy fillet, lettuce & mayo", price: 135, add: "bg" },
    { id: 26, cat: "chicken", ar: "أجنحة بافلو 8 قطع", en: "Buffalo Wings 8 pcs", dar: "صوص بافلو حار مع رانش", den: "Hot buffalo sauce with ranch", price: 160 },
    { id: 27, cat: "chicken", ar: "فاهيتا فراخ", en: "Chicken Fajita", dar: "فراخ وفلفل ألوان وبصل في تورتيلا", den: "Chicken, peppers & onion in tortilla", price: 140 },
    { id: 28, cat: "chicken", ar: "بوكس كريسبي عائلي", en: "Family Crispy Bucket", dar: "9 قطع، بطاطس عائلي، 2 كول سلو، لتر بيبسي", den: "9 pcs, family fries, 2 coleslaw, 1L Pepsi", price: 549 },

    { id: 29, cat: "manakish", ar: "منقوشة زعتر", en: "Zaatar Manousheh", dar: "زعتر سوري بزيت الزيتون", den: "Syrian zaatar with olive oil", price: 55 },
    { id: 30, cat: "manakish", ar: "منقوشة جبنة", en: "Cheese Manousheh", dar: "جبنة عكاوي وموتزاريلا", den: "Akkawi & mozzarella", price: 75 },
    { id: 31, cat: "manakish", ar: "منقوشة زعتر وجبنة", en: "Zaatar & Cheese", dar: "نص زعتر ونص جبنة", den: "Half zaatar, half cheese", price: 80 },
    { id: 32, cat: "manakish", ar: "صفيحة لحمة 6 قطع", en: "Lahm bi Ajeen 6 pcs", dar: "عجينة رقيقة بلحمة متبلة ودبس رمان", den: "Thin dough, spiced beef & pomegranate", price: 120 },
    { id: 33, cat: "manakish", ar: "فطاير سبانخ 4 قطع", en: "Spinach Fatayer 4 pcs", dar: "سبانخ بالليمون والسماق", den: "Spinach with lemon & sumac", price: 70 },
    { id: 34, cat: "manakish", ar: "عرايس لحمة", en: "Arayes", dar: "عيش محشي لحمة مشوي على الفحم", den: "Charcoal-grilled bread stuffed with beef", price: 140, best: true },

    { id: 35, cat: "apps", ar: "بطاطس فرايز", en: "French Fries", dar: "مقرمشة وذهبية", den: "Crispy & golden", price: 45, sizes: "fr" },
    { id: 36, cat: "apps", ar: "بطاطس بالجبنة", en: "Cheesy Fries", dar: "صوص شيدر سايح وهالبينو", den: "Melted cheddar & jalapeño", price: 70 },
    { id: 37, cat: "apps", ar: "ودجز سبايسي", en: "Spicy Wedges", dar: "بطاطس بالقشر بتتبيلة حارة", den: "Skin-on potatoes, spicy seasoning", price: 60 },
    { id: 38, cat: "apps", ar: "فلافل سوري 6 قطع", en: "Syrian Falafel 6 pcs", dar: "مع طحينة", den: "With tahini", price: 50 },
    { id: 39, cat: "apps", ar: "حمص بالطحينة", en: "Hummus", dar: "بزيت الزيتون والكمون", den: "With olive oil & cumin", price: 55 },
    { id: 40, cat: "apps", ar: "متبل", en: "Mutabbal", dar: "باذنجان مشوي بالطحينة", den: "Smoked eggplant with tahini", price: 55 },
    { id: 41, cat: "apps", ar: "كبة مقلية 4 قطع", en: "Fried Kibbeh 4 pcs", dar: "برغل محشي لحمة وصنوبر", den: "Bulgur shells with beef & pine nuts", price: 110 },
    { id: 42, cat: "apps", ar: "ورق عنب 12 قطعة", en: "Vine Leaves 12 pcs", dar: "بالليمون وزيت الزيتون", den: "With lemon & olive oil", price: 90 },
    { id: 43, cat: "apps", ar: "ثومية إضافية", en: "Extra Garlic Sauce", dar: "علبة 100 جم", den: "100g cup", price: 15 },
    { id: 44, cat: "apps", ar: "مخلل سوري", en: "Syrian Pickles", dar: "خيار ولفت", den: "Cucumber & turnip", price: 15 },

    { id: 45, cat: "salads", ar: "فتوش", en: "Fattoush", dar: "خضار طازة، عيش محمص ودبس رمان", den: "Fresh veg, toasted bread & pomegranate", price: 65 },
    { id: 46, cat: "salads", ar: "تبولة", en: "Tabbouleh", dar: "بقدونس وبرغل بالليمون", den: "Parsley & bulgur with lemon", price: 65 },
    { id: 47, cat: "salads", ar: "سيزر بالفراخ", en: "Chicken Caesar", dar: "خس روماني، فراخ جريل وبارميزان", den: "Romaine, grilled chicken & parmesan", price: 120 },
    { id: 48, cat: "salads", ar: "كول سلو", en: "Coleslaw", dar: "كريمي ومنعش", den: "Creamy & fresh", price: 35 },

    { id: 49, cat: "desserts", ar: "كنافة نابلسية", en: "Nabulsi Kunafa", dar: "بالجبنة والقطر", den: "With cheese & syrup", price: 90, best: true },
    { id: 50, cat: "desserts", ar: "بسبوسة بالقشطة", en: "Basbousa with Cream", dar: "طازة كل يوم", den: "Fresh daily", price: 60 },
    { id: 51, cat: "desserts", ar: "تشيز كيك لوتس", en: "Lotus Cheesecake", dar: "قاعدة بسكويت وصوص لوتس", den: "Biscuit base & Lotus sauce", price: 110 },
    { id: 52, cat: "desserts", ar: "براونيز بالآيس كريم", en: "Brownie & Ice Cream", dar: "براونيز سخنة مع فانيليا", den: "Warm brownie with vanilla", price: 95 },

    { id: 53, cat: "drinks", ar: "بيبسي كانز", en: "Pepsi Can", dar: "", den: "", price: 25 },
    { id: 54, cat: "drinks", ar: "سفن أب كانز", en: "7UP Can", dar: "", den: "", price: 25 },
    { id: 55, cat: "drinks", ar: "بيبسي لتر", en: "Pepsi 1L", dar: "", den: "", price: 45 },
    { id: 56, cat: "drinks", ar: "مياه معدنية", en: "Mineral Water", dar: "", den: "", price: 12 },
    { id: 57, cat: "drinks", ar: "ليمون بالنعناع", en: "Lemon Mint", dar: "فريش", den: "Fresh", price: 50 },
    { id: 58, cat: "drinks", ar: "برتقال فريش", en: "Fresh Orange", dar: "معصور طازة", den: "Freshly squeezed", price: 60 },
    { id: 59, cat: "drinks", ar: "ميلك شيك", en: "Milkshake", dar: "اختار النكهة", den: "Choose your flavor", price: 85, sizes: "ms" },
    { id: 60, cat: "drinks", ar: "عيران", en: "Ayran", dar: "لبن سوري بارد", den: "Cold Syrian yogurt drink", price: 30 }
  ]
};