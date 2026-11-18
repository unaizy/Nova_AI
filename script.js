
document.addEventListener("DOMContentLoaded", () => {
    // -----------------------------------------
    // 1. GET HTML ELEMENTS
    // -----------------------------------------

    const chatForm = document.getElementById("chatForm");
    const userInput = document.getElementById("userInput");
    const sendButton = document.getElementById("sendButton");
    const messages = document.getElementById("messages");
    const welcome = document.getElementById("welcome");
    const suggestions = document.getElementById("suggestions");
    const newChatButton = document.getElementById("newChat");
    const themeButton = document.getElementById("themeButton");
    const chatHistory = document.getElementById("chatHistory");

    // These three elements are essential for sending messages.
    if (!userInput || !messages) {
        console.error(
            "Nova AI could not start. Check that #userInput and #messages exist in index.html."
        );
        return;
    }

    // -----------------------------------------
    // 2. NOVA AI KNOWLEDGE BASE
    // -----------------------------------------

    const topicAnswers = {
        "artificial intelligence": `Artificial Intelligence (AI) is a technology that allows computers and machines to perform tasks that usually require human intelligence.

Examples of AI:
1. ChatGPT and other chatbots
2. Face recognition on smartphones
3. Voice assistants like Siri
4. Self-driving cars
5. Recommendation systems on Netflix

AI works by using data and algorithms to perform tasks, recognize patterns and make decisions.`,

        "machine learning": `Machine Learning (ML) is a branch of Artificial Intelligence that allows computers to learn from data and improve their performance without being explicitly programmed for every task.

Real-life examples:
1. YouTube recommending videos.
2. Email detecting spam messages.
3. Netflix suggesting movies.
4. Banks detecting suspicious transactions.
5. Shopping websites recommending products.

Three main types of Machine Learning:

1. Supervised Learning:
The computer learns using labelled examples.

2. Unsupervised Learning:
The computer finds patterns in data without labelled answers.

3. Reinforcement Learning:
The computer learns through rewards and penalties.

Example:
If we show a computer thousands of pictures of cats and dogs, it can learn to recognize whether a new picture contains a cat or a dog.

In simple words, Machine Learning teaches computers to learn from experience.`,

        "programming": `Programming is the process of giving instructions to a computer to perform a particular task.

Popular programming languages include:
1. Python
2. Java
3. JavaScript
4. C
5. C++

Example in Python:

print("Hello, World!")

This instruction tells the computer to display Hello, World!

Programming is used to build websites, mobile apps, games, software and many other technologies.`,

        "science": `Science is the systematic study of the natural world through observation and experiments.

Some major branches of science are:

1. Physics: Study of matter, energy, motion and forces.
2. Chemistry: Study of substances and how they react.
3. Biology: Study of living organisms.
4. Astronomy: Study of stars, planets and space.

Interesting fact:
Light travels at approximately 300,000 kilometres per second. Sunlight takes about 8 minutes and 20 seconds to reach Earth.`
    };

    const responses = [
        {
            keywords: ["hello", "hi", "hey", "good morning", "good evening"],
            answer: "Hello! 👋 I'm Nova AI. How can I help you today?"
        },
        {
            keywords: ["who are you", "your name", "what are you"],
            answer: "I'm Nova AI, your personal learning assistant. I can help you understand topics related to technology, programming, science and general knowledge."
        },
        {
            keywords: ["what can you do", "help me", "your features"],
            answer: "I can help you with:\n\n1. Artificial Intelligence\n2. Machine Learning\n3. Programming\n4. Science\n5. General Knowledge\n6. Indian General Knowledge\n\nAsk me a question to get started!"
        },
        {
            keywords: ["what is ai", "define ai", "artificial intelligence"],
            answer: topicAnswers["artificial intelligence"]
        },
        {
            keywords: ["what is machine learning", "define machine learning", "what is ml", "explain ml"],
            answer: topicAnswers["machine learning"]
        },
        {
            keywords: ["what is programming", "define programming", "coding"],
            answer: topicAnswers["programming"]
        },
        {
            keywords: ["what is science", "define science"],
            answer: topicAnswers["science"]
        },
        {
            keywords: ["difference between ai and ml", "ai vs ml"],
            answer: "Artificial Intelligence is the broader concept of making machines perform tasks that require human intelligence.\n\nMachine Learning is a part of AI that allows machines to learn from data.\n\nIn simple words: AI is the bigger field, and ML is one way to achieve AI."
        },
        {
            keywords: ["what is python", "python programming"],
            answer: "Python is a popular, beginner-friendly programming language. It is used in web development, automation, data science, Artificial Intelligence and Machine Learning.\n\nExample:\nprint('Hello, World!')"
        },
        {
            keywords: ["what is javascript", "javascript"],
            answer: "JavaScript is a programming language used to make websites interactive. It can respond to button clicks, validate forms, update webpage content and build web applications."
        },
        {
            keywords: ["what is html", "html"],
            answer: "HTML stands for HyperText Markup Language. It is used to create the structure of web pages, including headings, paragraphs, images, links and buttons."
        },
        {
            keywords: ["what is css", "css"],
            answer: "CSS stands for Cascading Style Sheets. It controls the appearance of websites, including colours, fonts, spacing, layouts and responsive designs."
        },
        {
            keywords: ["what is algorithm", "algorithm"],
            answer: "An algorithm is a step-by-step set of instructions used to solve a problem or complete a task.\n\nExample: A recipe is like an algorithm because it gives you instructions in a particular order."
        },
        {
            keywords: ["what is database", "database"],
            answer: "A database is an organized collection of information that can be stored, managed and retrieved easily. Examples include student records, banking information and online shopping records."
        },
        {
            keywords: ["what is gravity", "gravity"],
            answer: "Gravity is the force that attracts objects towards one another. Earth's gravity keeps us on the ground and keeps the Moon in orbit around Earth."
        },
        {
            keywords: ["solar system", "planets"],
            answer: "Our solar system has eight planets:\n\n1. Mercury\n2. Venus\n3. Earth\n4. Mars\n5. Jupiter\n6. Saturn\n7. Uranus\n8. Neptune\n\nThey orbit the Sun."
        },
        {
            keywords: ["capital of india", "india capital"],
            answer: "The capital of India is New Delhi. 🇮🇳"
        },
        {
            keywords: ["president of india", "who is the president"],
            answer: "The President of India is Droupadi Murmu."
        },
        {
            keywords: ["prime minister of india", "who is the prime minister"],
            answer: "The Prime Minister of India is Narendra Modi."
        },
        {
            keywords: ["vice president of india"],
            answer: "The Vice President of India is C. P. Radhakrishnan."
        },
        {
            keywords: ["national animal of india"],
            answer: "The national animal of India is the Bengal Tiger. 🐅"
        },
        {
            keywords: ["national bird of india"],
            answer: "The national bird of India is the Indian Peacock. 🦚"
        },
        {
            keywords: ["national flower of india"],
            answer: "The national flower of India is the Lotus."
        },
        {
            keywords: ["national fruit of india"],
            answer: "The national fruit of India is the Mango. 🥭"
        },
        {
            keywords: ["national anthem of india"],
            answer: "The national anthem of India is Jana Gana Mana, written by Rabindranath Tagore."
        },
        {
            keywords: ["national song of india"],
            answer: "The national song of India is Vande Mataram, written by Bankim Chandra Chatterjee."
        },
        {
            keywords: ["currency of india", "indian currency"],
            answer: "The currency of India is the Indian Rupee (₹), represented by the code INR."
        },
        {
            keywords: ["independence day of india"],
            answer: "India celebrates Independence Day on 15 August every year."
        },
        {
            keywords: ["republic day of india"],
            answer: "India celebrates Republic Day on 26 January every year."
        },
        {
            keywords: ["how many states in india", "states and union territories"],
            answer: "India has 28 states and 8 Union Territories."
        },
        {
            keywords: ["national language of india", "official language of india"],
            answer: "India has no constitutionally designated national language. Hindi in the Devanagari script is an official language of the Union, and English is also used for official purposes."
        },
        {
            keywords: ["largest state in india"],
            answer: "Rajasthan is the largest Indian state by area."
        },
        {
            keywords: ["smallest state in india"],
            answer: "Goa is the smallest Indian state by area."
        },
        {
            keywords: ["first president of india"],
            answer: "Dr. Rajendra Prasad was the first President of India."
        },
        {
            keywords: ["first prime minister of india"],
            answer: "Jawaharlal Nehru was the first Prime Minister of India."
        },
        {
            keywords: ["who wrote the indian constitution", "ambedkar"],
            answer: "Dr. B. R. Ambedkar chaired the Drafting Committee of the Indian Constitution and is widely known as the chief architect of the Constitution."
        },
        {
            keywords: ["capital of karnataka"],
            answer: "The capital of Karnataka is Bengaluru."
        },
        {
            keywords: ["capital of tamil nadu"],
            answer: "The capital of Tamil Nadu is Chennai."
        },
        {
            keywords: ["capital of kerala"],
            answer: "The capital of Kerala is Thiruvananthapuram."
        },
        {
            keywords: ["capital of maharashtra"],
            answer: "The capital of Maharashtra is Mumbai."
        },
        {
            keywords: ["capital of telangana"],
            answer: "The capital of Telangana is Hyderabad."
        },
        {
            keywords: ["capital of west bengal"],
            answer: "The capital of West Bengal is Kolkata."
        },
        {
            keywords: ["thank you", "thanks"],
            answer: "You're welcome! 😊 Feel free to ask me anything else."
        },
        {
            keywords: ["bye", "goodbye"],
            answer: "Goodbye! 👋 Have a great day. Come back whenever you need help!"
        }
    ];

    // -----------------------------------------
    // 3. FIND THE ANSWER
    // -----------------------------------------

    function normalizeText(text) {
        return text
            .toLowerCase()
            .replace(/[^\w\s]/g, " ")
            .replace(/\s+/g, " ")
            .trim();
    }

    function getBotResponse(message) {
        const text = normalizeText(message);

        // Check the four topic cards first.
        if (
            text.includes("machine learning") ||
            text === "ml" ||
            text.includes("what is ml") ||
            text.includes("explain ml")
        ) {
            return topicAnswers["machine learning"];
        }

        if (text.includes("artificial intelligence") || text === "ai") {
            return topicAnswers["artificial intelligence"];
        }

        if (text.includes("programming") || text === "coding") {
            return topicAnswers["programming"];
        }

        if (text.includes("science")) {
            return topicAnswers["science"];
        }

        // Check the general knowledge database.
        for (const item of responses) {
            if (item.keywords.some(keyword => text.includes(normalizeText(keyword)))) {
                return item.answer;
            }
        }

        return "That's an interesting question! I don't have a specific answer programmed for it yet. Try asking me about Artificial Intelligence, Machine Learning, Programming, Science or Indian General Knowledge.";
    }

    // -----------------------------------------
    // 4. DISPLAY A MESSAGE
    // -----------------------------------------

    function addMessage(text, sender) {
        const messageElement = document.createElement("div");
        messageElement.className = `message ${sender}`;

        const contentElement = document.createElement("div");
        contentElement.className = "message-content";
        contentElement.textContent = text;

        messageElement.appendChild(contentElement);
        messages.appendChild(messageElement);

        messages.scrollTop = messages.scrollHeight;
    }

    // -----------------------------------------
    // 5. TYPING INDICATOR
    // -----------------------------------------

    function showTyping() {
        const typingElement = document.createElement("div");
        typingElement.className = "message bot typing-message";
        typingElement.id = "novaTyping";

        const content = document.createElement("div");
        content.className = "message-content";
        content.textContent = "Nova AI is typing...";

        typingElement.appendChild(content);
        messages.appendChild(typingElement);

        messages.scrollTop = messages.scrollHeight;
    }

    function removeTyping() {
        const typingElement = document.getElementById("novaTyping");

        if (typingElement) {
            typingElement.remove();
        }
    }

    // -----------------------------------------
    // 6. CHAT HISTORY
    // -----------------------------------------

    let conversations = [];
    let currentConversation = null;

    function createConversation() {
        currentConversation = {
            id: Date.now(),
            title: "New Chat",
            messages: []
        };

        conversations.unshift(currentConversation);
        renderHistory();
    }

    function renderHistory() {
        if (!chatHistory) return;

        chatHistory.innerHTML = "";

        conversations.forEach(conversation => {
            const item = document.createElement("button");
            item.type = "button";
            item.className = "history-item";
            item.textContent = conversation.title;

            item.addEventListener("click", () => {
                loadConversation(conversation.id);
            });

            chatHistory.appendChild(item);
        });
    }

    function loadConversation(id) {
        const conversation = conversations.find(item => item.id === id);

        if (!conversation) return;

        currentConversation = conversation;
        messages.innerHTML = "";

        conversation.messages.forEach(message => {
            addMessage(message.text, message.sender);
        });

        if (welcome) welcome.style.display = "none";
        if (suggestions) suggestions.style.display = "none";
    }

    // -----------------------------------------
    // 7. SEND MESSAGE
    // -----------------------------------------

    let messageTimer = null;

    function sendMessage(customMessage = null) {
        const message = (customMessage || userInput.value).trim();

        if (!message) return;

        // Cancel any previous pending response.
        if (messageTimer) {
            clearTimeout(messageTimer);
            messageTimer = null;
        }

        // Start a conversation if necessary.
        if (!currentConversation) {
            createConversation();
        }

        // Hide the welcome screen and topic cards.
        if (welcome) welcome.style.display = "none";
        if (suggestions) suggestions.style.display = "none";

        // Display the user's message.
        addMessage(message, "user");

        currentConversation.messages.push({
            text: message,
            sender: "user"
        });

        if (currentConversation.title === "New Chat") {
            currentConversation.title =
                message.length > 25 ? message.substring(0, 25) + "..." : message;
        }

        renderHistory();

        userInput.value = "";

        if (sendButton) sendButton.disabled = true;

        // Show typing animation.
        showTyping();

        // Generate the answer.
        messageTimer = setTimeout(() => {
            removeTyping();

            const answer = getBotResponse(message);

            addMessage(answer, "bot");

            currentConversation.messages.push({
                text: answer,
                sender: "bot"
            });

            if (sendButton) sendButton.disabled = false;

            userInput.focus();
            messageTimer = null;
        }, 600);
    }

    // -----------------------------------------
    // 8. CHAT FORM AND SEND BUTTON
    // -----------------------------------------

    if (chatForm) {
        chatForm.addEventListener("submit", event => {
            event.preventDefault();
            sendMessage();
        });
    } else {
        // Fallback if the HTML does not contain a form.
        userInput.addEventListener("keydown", event => {
            if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                sendMessage();
            }
        });
    }

    if (sendButton && (!chatForm || sendButton.type !== "submit")) {
        sendButton.addEventListener("click", event => {
            event.preventDefault();
            sendMessage();
        });
    }

    // -----------------------------------------
    // 9. FOUR TOPIC CARDS
    // -----------------------------------------

    document.querySelectorAll(".suggestion-card").forEach(card => {
        card.addEventListener("click", () => {
            const prompt = card.getAttribute("data-prompt");

            if (prompt) {
                sendMessage(prompt);
            } else {
                console.error("A topic card is missing its data-prompt attribute.");
            }
        });
    });

    // -----------------------------------------
    // 10. NEW CHAT BUTTON
    // -----------------------------------------

    if (newChatButton) {
        newChatButton.addEventListener("click", () => {
            if (messageTimer) {
                clearTimeout(messageTimer);
                messageTimer = null;
            }

            removeTyping();

            currentConversation = null;
            messages.innerHTML = "";

            if (welcome) welcome.style.display = "";
            if (suggestions) suggestions.style.display = "";

            if (sendButton) sendButton.disabled = false;

            userInput.value = "";
            userInput.focus();
        });
    }

    // -----------------------------------------
    // 11. DARK MODE AND LIGHT MODE
    // -----------------------------------------

    function applyTheme(theme) {
        document.body.classList.toggle("dark", theme === "dark");

        if (themeButton) {
            themeButton.textContent =
                theme === "dark" ? "☀️ Light mode" : "🌙 Dark mode";
        }

        try {
            localStorage.setItem("novaTheme", theme);
        } catch (error) {
            console.warn("Theme preference could not be saved.", error);
        }
    }

    let savedTheme = "dark";

    try {
        savedTheme = localStorage.getItem("novaTheme") || "dark";
    } catch (error) {
        console.warn("Could not read saved theme.", error);
    }

    applyTheme(savedTheme);

    if (themeButton) {
        themeButton.addEventListener("click", () => {
            const newTheme = document.body.classList.contains("dark")
                ? "light"
                : "dark";

            applyTheme(newTheme);
        });
    }

    // -----------------------------------------
    // 12. NOVA AI READY
    // -----------------------------------------

    console.log("Nova AI started successfully!");

});
