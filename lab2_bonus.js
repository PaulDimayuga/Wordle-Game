"use strict";
//  Paul Michael Dimayuga
//  201905388
//  CS 150 Lab 1
let answer;
//let ctr = 0;
let correct = 0;
let row_num = 0;
let box_num = 0;
function Search_URL() {
    //  Checkpoint 1 start
    let searchBox = document.getElementById("URL_textbox");
    if (searchBox !== null) {
        const words_URL = searchBox.value;
        if (words_URL == '') {
            alert('No URL is specified!');
            return;
        }
        //console.log(words_URL);
        let wordsXhr = new XMLHttpRequest();
        wordsXhr.open('GET', words_URL, true);
        wordsXhr.send();
        wordsXhr.onload = function () {
            if (wordsXhr.status === 200) {
                const sectionsHtmlText = wordsXhr.responseText;
                let words_array = sectionsHtmlText.split("\n");
                const randomIndex = Math.floor(Math.random() * words_array.length);
                answer = words_array[randomIndex].toUpperCase();
                console.log(answer);
                searchBox === null || searchBox === void 0 ? void 0 : searchBox.remove();
                searchBtn === null || searchBtn === void 0 ? void 0 : searchBtn.remove();
                Game_page();
                //  Checkpoint 1 End
            }
        };
    }
}
function Game_page() {
    //  Checkpoint 2 Start
    let wordBox = document.createElement("input");
    wordBox.setAttribute("id", "word_textbox");
    wordBox.setAttribute("type", "text");
    let game_div = document.getElementById("content");
    game_div === null || game_div === void 0 ? void 0 : game_div.classList.add("game_Proper");
    create_Grid();
    create_Keyboard();
    document.body.addEventListener("keypress", get_Keyboard);
    document.body.addEventListener("keydown", Backspace);
    //  Checkpoint 2 End
}
function create_Grid() {
    let game_div = document.getElementById("content");
    let brd_container = document.createElement("div");
    brd_container.id = "brd_container";
    brd_container.classList.add("board_Container");
    let brd = document.createElement("div");
    brd.id = "brd";
    brd.classList.add("board_Proper");
    for (var i = 0; i < 6; i++) {
        let row = document.createElement("div");
        row.id = `grid_row${i}`;
        row.classList.add("grid_Row");
        for (var j = 0; j < 5; j++) {
            let box = document.createElement("div");
            box.id = `grid_row${i}_box${j}`;
            box.classList.add("grid_Box");
            box.setAttribute("state", "blank");
            box.textContent = "";
            row.appendChild(box);
        }
        brd.appendChild(row);
    }
    brd_container === null || brd_container === void 0 ? void 0 : brd_container.appendChild(brd);
    game_div === null || game_div === void 0 ? void 0 : game_div.appendChild(brd_container);
}
function create_Keyboard() {
    let game_div = document.getElementById("content");
    let kb_row1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
    let kb_row2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
    let kb_row3 = ["Z", "X", "C", "V", "B", "N", "M"];
    let kb_row1_e = document.createElement("div");
    let kb_row2_e = document.createElement("div");
    let kb_row3_e = document.createElement("div");
    kb_row1_e.id = "kb_row1";
    kb_row2_e.id = "kb_row2";
    kb_row3_e.id = "kb_row3";
    kb_row1_e.classList.add("Keyboard_row");
    kb_row2_e.classList.add("Keyboard_row");
    kb_row3_e.classList.add("Keyboard_row");
    for (var ltr of kb_row1) {
        let k = document.createElement("button");
        k.type = "button";
        k.id = `key_${ltr}`;
        k.setAttribute("letter", ltr);
        k.classList.add("Keyboard_key");
        k.setAttribute("state", "blank");
        k.textContent = ltr;
        k.addEventListener("click", function () {
            update_Grid(k.innerHTML);
            k.blur();
        });
        kb_row1_e.appendChild(k);
    }
    for (var ltr of kb_row2) {
        let k = document.createElement("button");
        k.type = "button";
        k.id = `key_${ltr}`;
        k.setAttribute("letter", ltr);
        k.classList.add("Keyboard_key");
        k.setAttribute("state", "blank");
        k.textContent = ltr;
        k.addEventListener("click", function () {
            update_Grid(k.innerHTML);
            k.blur();
        });
        kb_row2_e.appendChild(k);
    }
    for (var ltr of kb_row3) {
        let k = document.createElement("button");
        k.type = "button";
        k.id = `key_${ltr}`;
        k.setAttribute("letter", ltr);
        k.classList.add("Keyboard_key");
        k.setAttribute("state", "blank");
        k.textContent = ltr;
        k.addEventListener("click", function () {
            update_Grid(k.innerHTML);
            k.blur();
        });
        kb_row3_e.appendChild(k);
    }
    let kb = document.createElement("div");
    kb.id = "kb";
    kb.classList.add("Keyboard");
    kb === null || kb === void 0 ? void 0 : kb.appendChild(kb_row1_e);
    kb === null || kb === void 0 ? void 0 : kb.appendChild(kb_row2_e);
    kb === null || kb === void 0 ? void 0 : kb.appendChild(kb_row3_e);
    game_div === null || game_div === void 0 ? void 0 : game_div.appendChild(kb);
}
function get_Keyboard(k) {
    if (row_num == 6 || correct != 0) {
        return;
    }
    var alpha = /^[a-zA-Z]+$/;
    if (k.key !== "Enter" && k.key.match(alpha)) {
        update_Grid(k.key);
    }
    else if (k.key === "Enter") {
        Enter_press(k);
    }
    return;
}
function update_Grid(ltr) {
    if (box_num < 5) {
        let box = document === null || document === void 0 ? void 0 : document.getElementById(`grid_row${row_num}_box${box_num}`);
        box === null || box === void 0 ? void 0 : box.setAttribute("state", "guess");
        box.textContent = ltr;
        box_num++;
    }
}
function Backspace(k) {
    if (k.key === "Backspace") {
        if (box_num > 0) {
            box_num--;
            let box = document === null || document === void 0 ? void 0 : document.getElementById(`grid_row${row_num}_box${box_num}`);
            box === null || box === void 0 ? void 0 : box.setAttribute("state", "blank");
            box.textContent = '';
        }
    }
}
function Enter_press(k) {
    let game_div = document.getElementById("content");
    let row = document.getElementById(`grid_Row${row_num}`);
    if (k.key === "Enter") {
        let grid_input = "";
        for (var i = 0; i < 5; i++) {
            let box = document === null || document === void 0 ? void 0 : document.getElementById(`grid_row${row_num}_box${i}`);
            grid_input += box === null || box === void 0 ? void 0 : box.textContent;
        }
        let input_word = grid_input.toUpperCase();
        if (input_word.length == 5) {
            Checker(input_word, answer);
            if (input_word == answer) {
                //correct = 1;
                alert("Congrats! Papasa ka na sa CS 150 :>");
                document.body.removeEventListener("keypress", Enter_press);
                document.body.removeEventListener("keydown", Backspace);
                return;
            }
            else if (row_num == 5) {
                row_num++;
                alert(`Maximum valid guess has been reached. Word to be guessed is ${answer}.`);
                document.body.removeEventListener("keypress", Enter_press);
                document.body.removeEventListener("keydown", Backspace);
                return;
            }
            else {
                row_num++;
                box_num = 0;
            }
        }
    }
}
//  Checkpoint 3 Start
function Checker(guess, ans) {
    let ans_idx = {};
    let corr_idx = {};
    let misp_idx = {};
    for (var i = 0; i < 5; i++) {
        if (!(ans.charAt(i) in ans_idx)) {
            ans_idx[ans.charAt(i)] = [i];
        }
        else {
            ans_idx[ans.charAt(i)].push(i);
        }
    }
    for (var i = 0; i < 5; i++) {
        if (guess.charAt(i) in ans_idx) {
            if (ans_idx[guess.charAt(i)].includes(i)) {
                if (!(guess.charAt(i) in corr_idx)) {
                    corr_idx[guess.charAt(i)] = [i];
                }
                else {
                    corr_idx[guess.charAt(i)].push(i);
                }
            }
        }
    }
    for (var i = 0; i < 5; i++) {
        let g_ltr = guess.charAt(i);
        if (g_ltr in ans_idx) {
            if (!(g_ltr in corr_idx)) {
                if (!(g_ltr in misp_idx)) {
                    misp_idx[g_ltr] = [i];
                }
                else {
                    if (ans_idx[g_ltr].length > misp_idx[g_ltr].length) {
                        misp_idx[g_ltr].push(i);
                    }
                }
            }
            else {
                if (!(corr_idx[g_ltr].includes(i))) {
                    if (g_ltr in misp_idx) {
                        if (ans_idx[g_ltr].length > (corr_idx[g_ltr].length + misp_idx[g_ltr].length)) {
                            misp_idx[g_ltr].push(i);
                        }
                    }
                    else {
                        if (ans_idx[g_ltr].length > corr_idx[g_ltr].length) {
                            misp_idx[g_ltr] = [i];
                        }
                    }
                }
            }
        }
    }
    for (var i = 0; i < 5; i++) {
        let box = document === null || document === void 0 ? void 0 : document.getElementById(`grid_row${row_num}_box${i}`);
        let key = document.getElementById(`key_${guess.charAt(i)}`);
        if (guess.charAt(i) in corr_idx) {
            if (corr_idx[guess.charAt(i)].includes(i)) {
                box === null || box === void 0 ? void 0 : box.setAttribute("state", "correct");
                key === null || key === void 0 ? void 0 : key.setAttribute("state", "correct");
            }
            else if (guess.charAt(i) in misp_idx) {
                if (misp_idx[guess.charAt(i)].includes(i)) {
                    box === null || box === void 0 ? void 0 : box.setAttribute("state", "misplaced");
                    if ((key === null || key === void 0 ? void 0 : key.getAttribute("state")) != "correct") {
                        key === null || key === void 0 ? void 0 : key.setAttribute("state", "misplaced");
                    }
                }
            }
            else {
                box === null || box === void 0 ? void 0 : box.setAttribute("state", "wrong");
                if (!((key === null || key === void 0 ? void 0 : key.getAttribute("state")) == "correct" || (key === null || key === void 0 ? void 0 : key.getAttribute("state")) == "misplaced")) {
                    key === null || key === void 0 ? void 0 : key.setAttribute("state", "wrong");
                }
            }
        }
        else if (guess.charAt(i) in misp_idx) {
            if (misp_idx[guess.charAt(i)].includes(i)) {
                box === null || box === void 0 ? void 0 : box.setAttribute("state", "misplaced");
                if ((key === null || key === void 0 ? void 0 : key.getAttribute("state")) != "correct") {
                    key === null || key === void 0 ? void 0 : key.setAttribute("state", "misplaced");
                }
            }
            else {
                box === null || box === void 0 ? void 0 : box.setAttribute("state", "wrong");
                if (!((key === null || key === void 0 ? void 0 : key.getAttribute("state")) == "correct" || (key === null || key === void 0 ? void 0 : key.getAttribute("state")) == "misplaced")) {
                    key === null || key === void 0 ? void 0 : key.setAttribute("state", "wrong");
                }
            }
        }
        else {
            box === null || box === void 0 ? void 0 : box.setAttribute("state", "wrong");
            if (!((key === null || key === void 0 ? void 0 : key.getAttribute("state")) == "correct" || (key === null || key === void 0 ? void 0 : key.getAttribute("state")) == "misplaced")) {
                key === null || key === void 0 ? void 0 : key.setAttribute("state", "wrong");
            }
        }
    }
}
//  Checkpoint 3 End
let searchBox = document.getElementById("URL_textbox");
let def_url = "https://gist.githubusercontent.com/dracos/dd0668f281e685bad51479e5acaadb93/raw/ca9018b32e963292473841fb55fd5a62176769b5/valid-wordle-words.txt";
searchBox.value = def_url;
let searchBtn = document.getElementById("Search-URL-button");
searchBtn === null || searchBtn === void 0 ? void 0 : searchBtn.addEventListener("click", Search_URL);
