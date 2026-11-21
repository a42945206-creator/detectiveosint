// База кейсов. Сюда мы будем добавлять новые уровни.
const CASES = [
    {
        id: 1,
        title: "Пропавшая Инга",
        category: "OSINT",
        difficulty: "Легко",
        brief: "Клиент ищет сестру Ингу (@inga_star_). Она поехала на встречу с подругой из интернета. Найди улики: изучи <span class='interactive' onclick='openProfile()'>профиль Инги</span> и её <span class='interactive' onclick='openChat()'>переписку</span>.",
        questions: [
            { text: "Где сейчас Инга?", answers: [{t: "В кафе Café Luna", correct: true}, {t: "Аккаунт взломали", correct: false}] }
        ],
        reward: { money: 500, rep: 10, stars: 1 }
    },
    {
        id: 2,
        title: "Накрутка отзывов",
        category: "OSINT",
        difficulty: "Легко",
        brief: "Магазин жалуется на накрутку отзывов. Найди доказательства, что отзывы фейковые. Изучи <span class='interactive' onclick='openReviews()'>страницу отзывов</span>.",
        questions: [
            { text: "Что происходит с отзывами?", answers: [{t: "Это накрутка (боты)", correct: true}, {t: "Реальные клиенты", correct: false}] }
        ],
        reward: { money: 600, rep: 15, stars: 1 }
    },
    {
        id: 3,
        title: "Гео-детектив: Где снято фото?",
        category: "GEOINT",
        difficulty: "Средне",
        brief: "Нам прислали фото отеля. Нужно определить город. Изучи <span class='interactive' onclick='openPhotoGeo()'>фотографию</span>.",
        questions: [
            { text: "В каком городе сделан снимок?", answers: [{t: "Стамбул", correct: false}, {t: "Дубай", correct: true}, {t: "Каир", correct: false}] }
        ],
        reward: { money: 1000, rep: 25, stars: 2 }
    },
    {
        id: 4,
        title: "Охота на самолет (IMINT)",
        category: "IMINT",
        difficulty: "Сложно",
        brief: "На спутниковом снимке засечен неизвестный самолет. Определи модель. Изучи <span class='interactive' onclick='openPlane()'>снимок</span>.",
        questions: [
            { text: "Что это за самолет?", answers: [{t: "Boeing 737", correct: false}, {t: "Ан-225 «Мрия»", correct: true}] }
        ],
        reward: { money: 1500, rep: 40, stars: 3 }
    },
    {
        id: 5,
        title: "Фейковый профиль (HUMINT)",
        category: "HUMINT",
        difficulty: "Средне",
        brief: "Подозреваемый создал фейковый аккаунт. Найди нестыковки. Изучи <span class='interactive' onclick='openSuspect()'>профиль</span>.",
        questions: [
            { text: "Что выдает фейк?", answers: [{t: "Фото из стока", correct: true}, {t: "Слишком много постов", correct: false}] }
        ],
        reward: { money: 1200, rep: 30, stars: 2 }
    }
];

// Логика для Кейса 1
function openProfile() { showBrowser(`<h3>@inga_star_</h3><div class="fake-photo" onclick="addClue('На фото вывеска Café Luna')"><div class="coffee-cup">☕</div><div class="cafe-sign">Café Luna</div></div><p style="text-align:center; font-size:12px;">Нажми на фото</p><button class="btn btn-outline" onclick="openChat()">Переписка</button>`); }
function openChat() { showBrowser(`<h3>Переписка</h3><p><b>luna_friend:</b> Приходи в наше место!</p><span class="interactive" onclick="openFriendProfile()">Профиль @luna_friend</span>`); }
function openFriendProfile() { showBrowser(`<h3>@luna_friend</h3><p onclick="addClue('Аккаунт создан 5 дней назад')">Дата регистрации: <span class="interactive">5 дней назад</span></p><p onclick="addClue('0 друзей')">Друзья: <span class="interactive">0</span></p>`); }

// Логика для Кейса 2
function openReviews() { showBrowser(`<h3>Отзывы</h3><div class="review" onclick="addClue('Одинаковый текст отзывов')">Текст 1: <span class="interactive">Рекомендую всем!</span></div><div class="review" onclick="addClue('Одинаковый текст отзывов')">Текст 2: <span class="interactive">Рекомендую всем!</span></div><p>Проверь <span class="interactive" onclick="checkAuthors()">авторов</span></p>`); }
function checkAuthors() { showBrowser(`<h3>Авторы</h3><p>Дата регистрации: <span class="interactive" onclick="addClue('Все аккаунты созданы вчера')">Вчера</span></p>`); }

// Логика для Кейса 3 (GEOINT)
function openPhotoGeo() { showBrowser(`<h3>Фото отеля</h3><div class="fake-photo" style="background: #1e3a8a;"><div style="font-size:40px;">🏙️</div><div style="font-size:20px; font-weight:bold;">Burj Al Arab</div></div><p onclick="addClue('На фото виден отель Burj Al Arab')" style="text-align:center;">Нажми, чтобы изучить детали</p>`); }

// Логика для Кейса 4 (IMINT)
function openPlane() { showBrowser(`<h3>Спутниковый снимок</h3><div class="fake-photo" style="background:#333;"><div style="font-size:50px;">✈️</div><div>6 двигателей, огромный размах крыла</div></div><p onclick="addClue('У самолета 6 двигателей')" style="text-align:center;">Изучить характеристики</p>`); }

// Логика для Кейса 5 (HUMINT)
function openSuspect() { showBrowser(`<h3>Профиль подозреваемого</h3><div style="display:flex; gap:10px;"><div style="width:80px; height:80px; background:#555; border-radius:50%;"></div><div><p>Имя: Джон Смит</p><p>Фото: <span class="interactive" onclick="addClue('Фото найдено в фотобанке')">Найдено в фотобанке</span></p></div></div>`); }
