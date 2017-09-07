var basicCard = require('./basicCard.js');
var clozeCard = require('./clozeCard.js');
var inquirer = require('inquirer');
var fs = require('fs');
console.log('worked');
inquirer.prompt([
		{
			name: "task",
			message: "Would you like to make a specific card or study?",
			type: "list",
			choices: [{
				name: "Basic Card"
			},
			{
				name: "Cloze Card"
			},
			{
				name: "Study"
			}]
		}]).then(function(answer){
				if(answer.task === "Basic Card"){
					inquirer.prompt([
					{
						name: "front",
						message: "What is the question?"
					}, {
						name: "back",
						message: "What is the answer?"
					}
					]).then(function(answers) {
						var newCard = new basicCard(answers.front, answers.back);
						fs.appendFile("cards.txt", JSON.stringify(newCard, null, 2) + "\n", function(error){
							if(error){
								console.log(error);
							}else{
								console.log('New card added:');
								console.log(newCard);
							}
						});
					})
				}else if(answer.task === "Cloze Card"){
					inquirer.prompt([
					{
						name: "full",
						message: "What is the full statement?"
					}, {
						name: "partial",
						message: "What is the removed verbiage?"
					}
					]).then(function(answers) {
						if(answers.full.includes(answers.partial)){
							var newCard = new clozeCard(answers.full, answers.partial);
							fs.appendFile("cards.txt", JSON.stringify(newCard, null, 2) + "\n", function(error){
								if(error){
									console.log(error);
								}else{
									console.log('New card added:');
									console.log(newCard);
								}
							});
						}else{
							console.log('Error: the entered verbiage to remove is not contained in the full statement. A new card cannot be created.');
						}
					})
				}else if(answer.task === "Study"){
					fs.readFile("cards.txt", "UTF8", function(error, data){
						if(error){
							console.log(error);
						}else{
							console.log(data);
						}
				 	});
				}
			})