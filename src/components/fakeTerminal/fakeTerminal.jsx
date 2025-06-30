import React, { useState, useEffect } from "react";
import "./styles/fakeTerminal.css";

const initialLines = [
	"> Welcome to the fake terminal!",
	"Type 'help' to see available commands.",
	"Available commands: whoami, about, help, clear, projects, ascii, art, joke, quote, resume, calculator"
];

const FakeTerminal = () => {
	const [lines, setLines] = useState(initialLines);
	const [currentInput, setCurrentInput] = useState("");
	const [isCalculatorMode, setIsCalculatorMode] = useState(false);

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			const trimmedInput = currentInput.trim();

			if (isCalculatorMode) {
				if (trimmedInput.toLowerCase() === "exit") {
					setIsCalculatorMode(false);
					setLines([...lines, `> ${trimmedInput}`, "Exited calculator mode."]);
				} else {
					try {
						const result = eval(trimmedInput);
						setLines([...lines, `> ${trimmedInput}`, `= ${result}`]);
					} catch {
						setLines([...lines, `> ${trimmedInput}`, "Invalid expression. Try again."]);
					}
				}
				setCurrentInput("");
				return;
			}

			if (trimmedInput.toLowerCase() === "joke") {
				fetchJoke(lines);
				setCurrentInput("");
				return;
			}

			const newLines = [...lines, `> ${trimmedInput}`];
			const response = getResponse(trimmedInput);
			if (response) newLines.push(response);
			setLines(newLines);
			setCurrentInput("");
		}
	};

	const getResponse = (command) => {
		switch (command.toLowerCase()) {
			case "whoami":
				return "You are a curious visitor.";
			case "about":
				return "This is a fun fake terminal made with React.";
			case "help":
				return "Available commands: whoami, about, help, clear, projects, ascii, art, joke, quote, resume, calculator";
			case "projects":
				return "1. Portfolio Website\n2. Transaction App\n3. Hacker Zone";
			case "ascii":
				return `
     ___           ___           ___     
    /\__\         /\  \         /\__\    
   /:/  /        /::\  \       /:/  /    
  /:/__/        /:/\:\  \     /:/__/     
 /::\  \ ___   /:/  \:\  \   /::\  \ ___ 
/:/\:\  /\__\ /:/__/ \:\__\ /:/\:\  /\__\
\/__\:\/:/  / \:\  \ /:/  / \/__\:\/:/  /
     \::/  /   \:\  /:/  /       \::/  / 
     /:/  /     \:\/:/  /        /:/  /  
    /:/  /       \::/  /        /:/  /   
    \/__/         \/__/         \/__/    
(React Terminal)`;
			case "art":
				const asciiArts = [
					`  /\\_/\\  \n ( o.o ) \n  > ^ <  \n(Cat Art)`,
					`   __\n  /  \\\n  |  |
  @  @
  |  |
  || |/
  || ||
  |\\_/|
  \\___/\n(Dog Art)`,
					`  ,_,\n (O,O)\n (   )\n  " "\n(Owl Art)`,
					`  _____\n /     \\\n| () () |
 \\  ^  /\n  |||||\n  |||||\n(Robot)`,
					`  ,   ,\n /////|\n ///// |\n|~~~|  |\n|===|  |\n| B |  |\n| O | /\n| T |/\n'---'\n(Bot)`,
					` __/\\__\n\\ o_o /\n (___)\n(Alien)`,
					` _____\n/     \\\n| () () |
 \\  ^  /\n  |||||\n  |||||\n(Ghost)`,
					` ____||____\n///////////\\\n|    _    |||\n|[] | | []|||\n|   | |   |||\n|___|_|___|||\n(House)`,
					` _________\n/        /|\n/_______ / |\n|       |  |\n|  LAP  |  |\n|_______| /\n(Laptop)`,
					` (╯°□°）╯︵ ┻━┻\n(Table Flip)`,
					` ██████\n█      █\n█ 💩  █\n█      █\n ██████\n(Poop Box)`,
					` 🤡🤡🤡\n🤡     🤡\n🤡  🤡  🤡\n 🤡   🤡\n  🤡🤡\n(Clown Emoji)`,
					`(Rocket)\n   /^\\\n  |---|\n /     \\\n |     |\n/_______\\`
				];
				return asciiArts[Math.floor(Math.random() * asciiArts.length)];
			case "joke":
				return null;
			case "quote":
				const quotes = [
					"“Code is like humor. When you have to explain it, it’s bad.” – Cory House",
					"“Programs must be written for people to read, and only incidentally for machines to execute.” – Harold Abelson",
					"“Simplicity is the soul of efficiency.” – Austin Freeman",
					"“Before software can be reusable it first has to be usable.” – Ralph Johnson",
					"“Any fool can write code that a computer can understand. Good programmers write code that humans can understand.” – Martin Fowler",
					"“First, solve the problem. Then, write the code.” – John Johnson",
					"“Experience is the name everyone gives to their mistakes.” – Oscar Wilde",
					"“Make it work, make it right, make it fast.” – Kent Beck",
					"“Talk is cheap. Show me the code.” – Linus Torvalds",
					"“The best way to get a project done faster is to start sooner.” – Jim Highsmith",
					"“The function of good software is to make the complex appear simple.” – Grady Booch",
					"“I'm not a great programmer; I'm just a good programmer with great habits.” – Kent Beck"
				];
				return quotes[Math.floor(Math.random() * quotes.length)];
			case "resume":
				return "Opening resume...\n[Error: Fake terminal cannot open real files 😅]";
			case "calculator":
				setIsCalculatorMode(true);
				return "Calculator mode activated. Type expressions or 'exit' to quit.";
			case "clear":
				setLines(initialLines);
				return null;
			default:
				return `'${command}' is not recognized as a command. Type 'help' for options.`;
		}
	};

	const fetchJoke = async (newLinesBase) => {
		const curatedJokes = [
			"Why do programmers hate nature? It has too many bugs.",
			"Why do Java developers wear glasses? Because they don't see sharp.",
			"A SQL query walks into a bar, walks up to two tables and asks... 'Can I join you?'",
			"There are only 10 types of people in the world: those who understand binary and those who don’t.",
			"To understand recursion, you must first understand recursion.",
			"Debugging: Being the detective in a crime movie where you are also the murderer.",
			"I changed my password to 'incorrect'. So whenever I forget, it says: Your password is incorrect.",
			"Why did the programmer quit his job? Because he didn’t get arrays.",
			"Real programmers count from 0.",
			"Computers make very fast, very accurate mistakes.",
			"Knock knock. Who’s there? Race condition. Race condition who? Sorry, still loading...",
			"Why did the developer go broke? Because he used up all his cache.",
			"What’s a computer’s favorite beat? An algo-rhythm!",
			"Why was the computer cold? It left its Windows open.",
			"What do you call 8 hobbits? A hobbyte.",
			"Why did the DevOps engineer quit? They didn't get enough ops-tions."
		];
		const emojis = ["😂", "🤣", "😹", "😁", "😆", "😜", "🤓", "😎", "😏"];
		const emoji = emojis[Math.floor(Math.random() * emojis.length)];
		const randomJoke = curatedJokes[Math.floor(Math.random() * curatedJokes.length)];
		setLines([...newLinesBase, `${randomJoke} ${emoji}`]);
	};

	return (
		<div className="fake-terminal">
			{lines.map((line, index) => (
				<div key={index} className="terminal-line">{line}</div>
			))}
			<div className="terminal-line">
				<span>&gt; </span>
				<span className="input-capture">
					<input
						type="text"
						value={currentInput}
						onChange={(e) => setCurrentInput(e.target.value)}
						onKeyDown={handleKeyDown}
						autoFocus
					/>
				</span>
			</div>
		</div>
	);
};

export default FakeTerminal;