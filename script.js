$(document).ready(function(){
    var currentStep = 1;
    var totalSteps = 10;
    var correctCount = 0;
    var incorrectCount = 0;
    var difficulty = 'easy';
    var easyWords = ["cat", "dog", "mother", "tree", "book", "pen", "sky", "you", "cup", "sea"];
    var easyTranslations = ["кіт", "собака", "мама", "дерево", "книга", "ручка", "небо", "ти", "чашка", "море"];
    var normalWords = ["to miss", "sometimes", "never", "house", "thought", "usually", "motherland", "forfeit", "guidance", "chamber"];
    var translations = ["скучати", "інколи", "ніколи", "дім", "думка", "зазвичай", "батьківщина", "позбавитися", "керівництво", "камера"];
    var hardWords = ["consanguineous", "inundate", "puissant", "quisling", "untoward", "jurisprudence", "biochemistry", "dewdropper", "nanotechnology", "neuroscience"];
    var hardTranslations = ["єдинокровні", "затоплювати", "могутній", "зрадник", "незручний", "юриспруденція", "біохімія", "ледар", "нанотехнології", "нейронаука"];
    var usedIndexes = [];
   

  
    function updateStats() {
        $('#current-step').text(currentStep);
        $('#correct-count').text(correctCount);
        $('#incorrect-count').text(incorrectCount);
    }

    
    $('input[name="difficulty"]').change(function() {
        difficulty = $(this).val();
        resetGame();
    });

    
    function getRandomWordIndex(wordList) {
        var randomIndex = Math.floor(Math.random() * wordList.length);
        while(usedIndexes.includes(randomIndex)) {
            randomIndex = Math.floor(Math.random() * wordList.length);
        }
        usedIndexes.push(randomIndex);
        return randomIndex;
    }

   
    function resetGame() {
        currentStep = 1;
        correctCount = 0;
        incorrectCount = 0;
        usedIndexes = [];
        showNextWord();
        updateStats();
    }

   
    function showNextWord() {
        var wordList, translationList;

        switch(difficulty) {
            case 'easy':
                wordList = easyWords;
                translationList = easyTranslations;
                break;
            case 'hard':
                wordList = hardWords;
                translationList = hardTranslations;
                break;
            default:
                wordList = normalWords;
                translationList = translations;
        }

        if (currentStep > totalSteps) {
            $('#results-modal').show();
            $('#language-level').text(correctCount > 7 ? 'Продвинутий' : correctCount > 4 ? 'Проміжний' : 'Початковий');
        } else {
            var randomIndex = getRandomWordIndex(wordList);
            $('#flashcard .card-word').text(wordList[randomIndex]);
            $('#translation-input').val('');
            updateStats();
        }
    }

   
    $('#check-button').click(function(){
        var inputTranslation = $('#translation-input').val().trim();
        var currentWord = $('#flashcard .card-word').text();
        var wordList, translationList;

        switch(difficulty) {
            case 'easy':
                wordList = easyWords;
                translationList = easyTranslations;
                break;
            case 'hard':
                wordList = hardWords;
                translationList = hardTranslations;
                break;
            default:
                wordList = normalWords;
                translationList = translations;
        }

        var wordIndex = wordList.indexOf(currentWord);
        if (wordIndex !== -1 && inputTranslation.toLowerCase() === translationList[wordIndex].toLowerCase()) {
            correctCount++;
        } else {
            incorrectCount++;
        }
        currentStep++;
        showNextWord();
    });

    
    $('#results-modal').click(function(event){
        if (event.target.id === 'results-modal' || event.target.className === 'close-button') {
            $('#results-modal').hide();
            resetGame();
        }
    });

    showNextWord(); 
});
