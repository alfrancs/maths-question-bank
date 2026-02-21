// Question generators for each sub-topic
const questionGenerators = [
    // 0: Expanding & Factorising
    {
        name: "Expanding & Factorising",
        generate: () => {
            const type = Math.random() < 0.5 ? 'expand' : 'factorise';
            
            if (type === 'expand') {
                const a = Math.floor(Math.random() * 5) + 2;
                const b = Math.floor(Math.random() * 5) + 2;
                const sign1 = Math.random() < 0.5 ? '+' : '-';
                const sign2 = Math.random() < 0.5 ? '+' : '-';
                
                const equation = `(x ${sign1} ${a})(x ${sign2} ${b})`;
                const bCoeff = sign1 === '+' && sign2 === '+' ? a + b :
                              sign1 === '-' && sign2 === '-' ? -(a + b) :
                              sign1 === '+' ? b - a : a - b;
                const c = sign1 === '+' && sign2 === '+' ? a * b :
                         sign1 === '-' && sign2 === '-' ? a * b :
                         sign1 === '+' ? -a * b : -a * b;
                
                const bStr = bCoeff >= 0 ? `+ ${bCoeff}x` : `- ${Math.abs(bCoeff)}x`;
                const cStr = c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`;
                
                return {
                    question: `Expand and simplify: ${equation}`,
                    answer: `x² ${bStr} ${cStr}`,
                    type: 'expand'
                };
            } else {
                const root1 = Math.floor(Math.random() * 8) + 1;
                const root2 = Math.floor(Math.random() * 8) + 1;
                const sign = Math.random() < 0.5;
                
                if (sign) {
                    const b = root1 + root2;
                    const c = root1 * root2;
                    return {
                        question: `Factorise: x² + ${b}x + ${c}`,
                        answer: `(x + ${root1})(x + ${root2})`,
                        type: 'factorise'
                    };
                } else {
                    const b = root1 + root2;
                    const c = root1 * root2;
                    return {
                        question: `Factorise: x² - ${b}x + ${c}`,
                        answer: `(x - ${root1})(x - ${root2})`,
                        type: 'factorise'
                    };
                }
            }
        }
    },
    
    // 1: Solving via Factorisation
    {
        name: "Solving via Factorisation",
        generate: () => {
            const patterns = [
                // x² + bx + c
                () => {
                    const root1 = Math.floor(Math.random() * 8) + 1;
                    const root2 = Math.floor(Math.random() * 8) + 1;
                    const b = root1 + root2;
                    const c = root1 * root2;
                    return {
                        equation: `x² + ${b}x + ${c} = 0`,
                        solutions: [-root1, -root2].sort((a, b) => a - b)
                    };
                },
                // x² - bx + c
                () => {
                    const root1 = Math.floor(Math.random() * 8) + 1;
                    const root2 = Math.floor(Math.random() * 8) + 1;
                    const b = root1 + root2;
                    const c = root1 * root2;
                    return {
                        equation: `x² - ${b}x + ${c} = 0`,
                        solutions: [root1, root2].sort((a, b) => a - b)
                    };
                },
                // x² + bx - c
                () => {
                    const root1 = Math.floor(Math.random() * 8) + 1;
                    const root2 = -(Math.floor(Math.random() * 8) + 1);
                    const b = root1 + root2;
                    const c = root1 * root2;
                    const bStr = b >= 0 ? `+ ${b}x` : `- ${Math.abs(b)}x`;
                    return {
                        equation: `x² ${bStr} - ${Math.abs(c)} = 0`,
                        solutions: [root1, root2].sort((a, b) => a - b)
                    };
                },
                // ax² + bx + c
                () => {
                    const a = Math.floor(Math.random() * 3) + 2;
                    const p = Math.floor(Math.random() * 5) + 1;
                    const q = Math.floor(Math.random() * 5) + 1;
                    const b = -(a * q + p);
                    const c = p * q;
                    const bStr = b >= 0 ? `+ ${b}x` : `- ${Math.abs(b)}x`;
                    const cStr = c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`;
                    return {
                        equation: `${a}x² ${bStr} ${cStr} = 0`,
                        solutions: [p/a, q].sort((a, b) => a - b),
                        solutionsDisplay: [`${p}/${a}`, `${q}`].sort((a, b) => {
                            const valA = a.includes('/') ? parseFloat(a.split('/')[0])/parseFloat(a.split('/')[1]) : parseFloat(a);
                            const valB = b.includes('/') ? parseFloat(b.split('/')[0])/parseFloat(b.split('/')[1]) : parseFloat(b);
                            return valA - valB;
                        })
                    };
                },
                // Difference of squares
                () => {
                    const n = Math.floor(Math.random() * 10) + 2;
                    return {
                        equation: `x² - ${n * n} = 0`,
                        solutions: [-n, n]
                    };
                }
            ];
            
            const generator = patterns[Math.floor(Math.random() * patterns.length)];
            const result = generator();
            
            return {
                question: `Solve: ${result.equation}`,
                answer: result.solutionsDisplay ? result.solutionsDisplay.join(', ') : result.solutions.join(', '),
                solutions: result.solutions,
                solutionsDisplay: result.solutionsDisplay
            };
        }
    },
    
    // 2: Quadratic Formula
    {
        name: "Solving via Quadratic Formula",
        generate: () => {
            // Generate quadratics that don't factorise nicely
            const a = Math.floor(Math.random() * 3) + 1;
            const b = Math.floor(Math.random() * 10) + 1;
            const c = Math.floor(Math.random() * 5) + 1;
            
            const discriminant = b * b - 4 * a * c;
            const sqrt = Math.sqrt(Math.abs(discriminant));
            
            if (discriminant >= 0) {
                const x1 = (-b + sqrt) / (2 * a);
                const x2 = (-b - sqrt) / (2 * a);
                const aStr = a === 1 ? '' : a;
                const bStr = b >= 0 ? `+ ${b}x` : `- ${Math.abs(b)}x`;
                const cStr = c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`;
                
                return {
                    question: `Solve using the quadratic formula: ${aStr}x² ${bStr} ${cStr} = 0`,
                    answer: Number.isInteger(x1) ? `${x1.toFixed(0)}, ${x2.toFixed(0)}` : `${x1.toFixed(2)}, ${x2.toFixed(2)}`,
                    solutions: [x1, x2].sort((a, b) => a - b)
                };
            } else {
                return questionGenerators[2].generate(); // Regenerate if no real solutions
            }
        }
    },
    
    // 3: Completing the Square
    {
        name: "Completing the Square",
        generate: () => {
            const p = Math.floor(Math.random() * 8) + 1;
            const q = Math.floor(Math.random() * 10) - 5;
            
            // (x + p)² + q expands to x² + 2px + p² + q
            const b = 2 * p;
            const c = p * p + q;
            
            const bStr = b >= 0 ? `+ ${b}x` : `- ${Math.abs(b)}x`;
            const cStr = c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`;
            const qStr = q >= 0 ? `+ ${q}` : `- ${Math.abs(q)}`;
            
            return {
                question: `Write in completed square form: x² ${bStr} ${cStr}`,
                answer: `(x + ${p})² ${qStr}`,
                turningPoint: `(-${p}, ${q})`
            };
        }
    },
    
    // 4: Sketching from Key Points
    {
        name: "Sketching from Key Points",
        generate: () => {
            const root1 = Math.floor(Math.random() * 5) + 1;
            const root2 = Math.floor(Math.random() * 5) + 1;
            const a = Math.random() < 0.5 ? 1 : -1;
            
            const b = -(root1 + root2);
            const c = root1 * root2;
            
            const bStr = b >= 0 ? `+ ${b}x` : `- ${Math.abs(b)}x`;
            const cStr = c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`;
            const aStr = a === 1 ? '' : a === -1 ? '-' : a;
            
            const yIntercept = a * c;
            const turningX = (root1 + root2) / 2;
            const turningY = a * (turningX * turningX + b * turningX + c);
            
            return {
                question: `Sketch y = ${aStr}x² ${bStr} ${cStr}, marking roots, y-intercept, and turning point`,
                answer: `Roots: ${root1}, ${root2}; y-intercept: ${yIntercept}; turning point: (${turningX}, ${turningY.toFixed(1)})`
            };
        }
    },
    
    // 5-8: Placeholder generators (to be fully developed)
    {
        name: "Finding Roots & Intercepts",
        generate: () => {
            const root1 = Math.floor(Math.random() * 8) + 1;
            const root2 = Math.floor(Math.random() * 8) + 1;
            const b = root1 + root2;
            const c = root1 * root2;
            
            return {
                question: `Find the roots and y-intercept of y = x² - ${b}x + ${c}`,
                answer: `Roots: x = ${root1}, ${root2}; y-intercept: ${c}`
            };
        }
    },
    
    {
        name: "Plotting from Table of Values",
        generate: () => {
            const a = Math.floor(Math.random() * 3) + 1;
            const b = Math.floor(Math.random() * 6) - 3;
            const c = Math.floor(Math.random() * 10) - 5;
            
            return {
                question: `Complete the table for y = ${a}x² + ${b}x + ${c} for x = -2, -1, 0, 1, 2`,
                answer: 'Use table values'
            };
        }
    },
    
    {
        name: "Using Graphs to Find Roots",
        generate: () => {
            return {
                question: `Use the graph to find the solutions to the equation (graph-based question)`,
                answer: 'Read from graph'
            };
        }
    },
    
    {
        name: "Solving Equations Graphically",
        generate: () => {
            return {
                question: `Solve graphically by finding intersection points (graph-based question)`,
                answer: 'Find intersection points'
            };
        }
    }
];

// Initialize questions on page load
let currentQuestions = {};

function initializeQuestions() {
    for (let section = 0; section < 9; section++) {
        generateQuestions(section);
    }
}

function generateQuestions(sectionIndex) {
    const container = document.getElementById(`questions-${sectionIndex}`);
    if (!container) return;
    
    container.innerHTML = '';
    currentQuestions[sectionIndex] = [];
    
    for (let i = 0; i < 6; i++) {
        const q = questionGenerators[sectionIndex].generate();
        currentQuestions[sectionIndex].push(q);
        
        const card = document.createElement('div');
        card.className = 'question-card';
        card.innerHTML = `
            <div class="question-number">Question ${i + 1}</div>
            <div class="question-text">${q.question}</div>
            <input type="text" class="answer-input" id="answer-${sectionIndex}-${i}" 
                   placeholder="Enter your answer...">
            <div class="button-group">
                <button class="check-btn" onclick="checkAnswer(${sectionIndex}, ${i})">Check Answer</button>
            </div>
            <div class="feedback" id="feedback-${sectionIndex}-${i}"></div>
        `;
        container.appendChild(card);
    }
}

function checkAnswer(section, questionIndex) {
    const input = document.getElementById(`answer-${section}-${questionIndex}`);
    const feedback = document.getElementById(`feedback-${section}-${questionIndex}`);
    const question = currentQuestions[section][questionIndex];
    
    const userAnswer = input.value.trim().toLowerCase();
    const correctAnswer = question.answer.toLowerCase();
    
    // For numerical answers, parse and compare
    if (question.solutions) {
        const userVals = userAnswer.split(',').map(x => {
            x = x.trim();
            if (x.includes('/')) {
                const parts = x.split('/');
                return parseFloat(parts[0]) / parseFloat(parts[1]);
            }
            return parseFloat(x);
        }).sort((a, b) => a - b);
        
        const correctVals = question.solutions;
        const isCorrect = userVals.length === correctVals.length &&
                         userVals.every((val, i) => Math.abs(val - correctVals[i]) < 0.01);
        
        if (isCorrect) {
            input.className = 'answer-input correct';
            feedback.className = 'feedback correct show';
            feedback.textContent = '✓ Correct! Well done!';
        } else {
            input.className = 'answer-input incorrect';
            feedback.className = 'feedback incorrect show';
            const displayAnswer = question.solutionsDisplay ? question.solutionsDisplay.join(', ') : question.solutions.join(', ');
            feedback.textContent = `✗ Incorrect. The correct answer is: x = ${displayAnswer}`;
        }
    } else {
        // For text-based answers
        const isCorrect = userAnswer === correctAnswer || 
                         userAnswer.replace(/\s/g, '') === correctAnswer.replace(/\s/g, '');
        
        if (isCorrect) {
            input.className = 'answer-input correct';
            feedback.className = 'feedback correct show';
            feedback.textContent = '✓ Correct! Well done!';
        } else {
            input.className = 'answer-input incorrect';
            feedback.className = 'feedback incorrect show';
            feedback.textContent = `✗ Incorrect. The correct answer is: ${question.answer}`;
        }
    }
}

function generatePractice(sectionIndex) {
    const practiceQuestions = [];
    for (let i = 0; i < 12; i++) {
        practiceQuestions.push(questionGenerators[sectionIndex].generate());
    }
    
    document.getElementById('mainView').style.display = 'none';
    document.getElementById('practiceView').classList.add('active');
    document.getElementById('practiceTitle').textContent = `Practice: ${questionGenerators[sectionIndex].name}`;
    
    const container = document.getElementById('practiceContainer');
    container.innerHTML = '';
    
    practiceQuestions.forEach((q, index) => {
        const card = document.createElement('div');
        card.className = 'practice-card';
        card.innerHTML = `
            <div style="font-weight: bold; margin-bottom: 15px; color: #485e2e;">Question ${index + 1}</div>
            <div class="question-text">${q.question}</div>
            <div style="margin-top: 15px; padding: 15px; background: white; border-radius: 6px; font-family: 'Courier New', monospace;">
                <strong>Answer:</strong> ${q.answer}
            </div>
        `;
        container.appendChild(card);
    });
    
    window.scrollTo(0, 0);
}

function backToMain() {
    document.getElementById('mainView').style.display = 'block';
    document.getElementById('practiceView').classList.remove('active');
    window.scrollTo(0, 0);
}

function showSection(index) {
    // Hide all sections
    document.querySelectorAll('.question-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active from all nav items
    document.querySelectorAll('.sub-topic-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Show selected section
    document.querySelector(`[data-section="${index}"]`).classList.add('active');
    document.querySelectorAll('.sub-topic-link')[index].classList.add('active');
    
    window.scrollTo(0, 0);
}

function toggleExample(index) {
    const example = document.getElementById(`example-${index}`);
    const button = example.previousElementSibling.querySelector('.worked-example-toggle');
    
    if (example.classList.contains('show')) {
        example.classList.remove('show');
        button.textContent = 'Show Worked Example';
    } else {
        example.classList.add('show');
        button.textContent = 'Hide Worked Example';
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initializeQuestions);
