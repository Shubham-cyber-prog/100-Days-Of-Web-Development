let members = JSON.parse(localStorage.getItem('expenseSplitter_members')) || [];
        let expenses = JSON.parse(localStorage.getItem('expenseSplitter_expenses')) || [];
        let settlements = JSON.parse(localStorage.getItem('expenseSplitter_settlements')) || [];

        
        document.addEventListener('DOMContentLoaded', function() {
            updateMembersList();
            updateExpensesList();
            updateStats();
            updateBalances();
            updateSettlementUI();
        });

        
        function addMember() {
            const nameInput = document.getElementById('memberName');
            const name = nameInput.value.trim();
            
            if (!name) {
                alert('Please enter a name');
                return;
            }
            
           
            if (members.some(m => m.name.toLowerCase() === name.toLowerCase())) {
                alert('Member already exists');
                return;
            }
            
            const member = {
                id: Date.now().toString(),
                name: name,
                balance: 0
            };
            
            members.push(member);
            saveData();
            
            nameInput.value = '';
            updateMembersList();
            updateBalances();
            updateSettlementUI();
        }

        
        function deleteMember(id) {
            if (confirm('Are you sure? This will also delete all related expenses.')) {
                members = members.filter(m => m.id !== id);
                expenses = expenses.filter(e => e.paidBy !== id && !e.splitBetween.includes(id));
                saveData();
                updateMembersList();
                updateExpensesList();
                updateBalances();
                updateSettlementUI();
            }
        }

        
        function addExpense() {
            const title = document.getElementById('expenseTitle').value.trim();
            const amount = parseFloat(document.getElementById('expenseAmount').value);
            const paidBy = document.getElementById('paidBy').value;
            const checkboxes = document.querySelectorAll('#splitCheckboxes input[type="checkbox"]:checked');
            
            
            if (!title) {
                alert('Please enter expense description');
                return;
            }
            
            if (!amount || amount <= 0) {
                alert('Please enter a valid amount');
                return;
            }
            
            if (!paidBy) {
                alert('Please select who paid');
                return;
            }
            
            if (checkboxes.length === 0) {
                alert('Please select at least one person to split with');
                return;
            }
            
            
            const splitBetween = Array.from(checkboxes).map(cb => cb.value);
            
           
            const splitAmount = amount / splitBetween.length;
            
           
            const expense = {
                id: Date.now().toString(),
                title: title,
                amount: amount,
                paidBy: paidBy,
                splitBetween: splitBetween,
                splitAmount: splitAmount,
                date: new Date().toLocaleDateString()
            };
            
            expenses.push(expense);
            saveData();
            
            
            document.getElementById('expenseTitle').value = '';
            document.getElementById('expenseAmount').value = '';
            
            
            showAlert('successAlert', 'Expense added successfully!');
            
            
            updateExpensesList();
            updateBalances();
            updateStats();
            updateSettlementUI();
        }

       
        function deleteExpense(id) {
            if (confirm('Are you sure you want to delete this expense?')) {
                expenses = expenses.filter(e => e.id !== id);
                saveData();
                updateExpensesList();
                updateBalances();
                updateStats();
                updateSettlementUI();
            }
        }

       
        function updateMembersList() {
            const membersList = document.getElementById('membersList');
            const paidBySelect = document.getElementById('paidBy');
            const fromUserSelect = document.getElementById('fromUser');
            const toUserSelect = document.getElementById('toUser');
            const splitCheckboxes = document.getElementById('splitCheckboxes');
            
            
            membersList.innerHTML = '';
            paidBySelect.innerHTML = '<option value="">Select payer</option>';
            fromUserSelect.innerHTML = '<option value="">Select sender</option>';
            toUserSelect.innerHTML = '<option value="">Select receiver</option>';
            splitCheckboxes.innerHTML = '';
            
            if (members.length === 0) {
                membersList.innerHTML = `
                    <div class="empty-state" id="emptyMembers">
                        <i class="fas fa-user-plus"></i>
                        <p>No members added yet</p>
                    </div>
                `;
                return;
            }
            
           
            members.forEach(member => {
               
                const li = document.createElement('li');
                li.innerHTML = `
                    <span>${member.name}</span>
                    <button class="btn btn-danger btn-sm" onclick="deleteMember('${member.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                `;
                membersList.appendChild(li);
                
                
                const option = document.createElement('option');
                option.value = member.id;
                option.textContent = member.name;
                paidBySelect.appendChild(option.cloneNode(true));
                
                
                fromUserSelect.appendChild(option.cloneNode(true));
                toUserSelect.appendChild(option.cloneNode(true));
                
                
                const checkboxDiv = document.createElement('div');
                checkboxDiv.className = 'checkbox-item';
                checkboxDiv.innerHTML = `
                    <input type="checkbox" id="member_${member.id}" value="${member.id}" checked>
                    <label for="member_${member.id}">${member.name}</label>
                `;
                splitCheckboxes.appendChild(checkboxDiv);
            });
        }

        
        function updateExpensesList() {
            const expensesList = document.getElementById('expensesList');
            expensesList.innerHTML = '';
            
            if (expenses.length === 0) {
                expensesList.innerHTML = `
                    <div class="empty-state" id="emptyExpenses">
                        <i class="fas fa-receipt"></i>
                        <p>No expenses added yet</p>
                        <p style="font-size: 0.9rem; margin-top: 10px;">Add an expense to get started!</p>
                    </div>
                `;
                return;
            }
            
           
            const sortedExpenses = [...expenses].sort((a, b) => b.id - a.id);
            
            sortedExpenses.forEach(expense => {
                const paidByMember = members.find(m => m.id === expense.paidBy);
                const splitMembers = members.filter(m => expense.splitBetween.includes(m.id));
                
                const expenseDiv = document.createElement('div');
                expenseDiv.className = 'expense-item';
                expenseDiv.innerHTML = `
                    <div class="expense-header">
                        <div class="expense-title">${expense.title}</div>
                        <div class="expense-amount">$${expense.amount.toFixed(2)}</div>
                    </div>
                    <div class="expense-details">
                        <div>
                            <div>Paid by: ${paidByMember?.name || 'Unknown'}</div>
                            <div>Date: ${expense.date}</div>
                        </div>
                        <div style="text-align: right;">
                            <div>Split between: ${splitMembers.length} people</div>
                            <div class="split-badge">$${expense.splitAmount.toFixed(2)} each</div>
                        </div>
                    </div>
                    <div style="text-align: right; margin-top: 10px;">
                        <button class="btn btn-danger btn-sm" onclick="deleteExpense('${expense.id}')">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                `;
                expensesList.appendChild(expenseDiv);
            });
        }

        
        function updateBalances() {
            const balanceSummary = document.getElementById('balanceSummary');
            const settlementSuggestions = document.getElementById('settlementSuggestions');
            
            
            members.forEach(member => member.balance = 0);
            
           
            expenses.forEach(expense => {
                const paidBy = members.find(m => m.id === expense.paidBy);
                if (paidBy) {
                    paidBy.balance += expense.amount;
                }
                
                
                expense.splitBetween.forEach(memberId => {
                    const member = members.find(m => m.id === memberId);
                    if (member) {
                        member.balance -= expense.splitAmount;
                    }
                });
            });
            
           
            settlements.forEach(settlement => {
                const from = members.find(m => m.id === settlement.from);
                const to = members.find(m => m.id === settlement.to);
                
                if (from && to) {
                    from.balance += settlement.amount;
                    to.balance -= settlement.amount;
                }
            });
            
            
            members.forEach(member => {
                member.balance = Math.round(member.balance * 100) / 100;
            });
            
           
            if (members.length === 0) {
                balanceSummary.innerHTML = `
                    <div class="empty-state" style="color: white;">
                        <i class="fas fa-calculator"></i>
                        <p>Add members to see balances</p>
                    </div>
                `;
                settlementSuggestions.innerHTML = '';
                return;
            }
            
            let balanceHTML = '';
            let positiveBalances = [];
            let negativeBalances = [];
            
            members.forEach(member => {
                const balanceClass = member.balance >= 0 ? 'positive' : 'negative';
                const sign = member.balance >= 0 ? '+' : '';
                
                balanceHTML += `
                    <div class="balance-item">
                        <span>${member.name}</span>
                        <span class="${balanceClass}">${sign}$${member.balance.toFixed(2)}</span>
                    </div>
                `;
                
                if (member.balance > 0) {
                    positiveBalances.push({...member});
                } else if (member.balance < 0) {
                    negativeBalances.push({...member});
                }
            });
            
            balanceSummary.innerHTML = balanceHTML;
            
            
            settlementSuggestions.innerHTML = '';
            if (positiveBalances.length > 0 && negativeBalances.length > 0) {
                let suggestionsHTML = '<h3 style="margin-bottom: 10px;"><i class="fas fa-lightbulb"></i> Settlement Suggestions:</h3>';
                
                
                positiveBalances.sort((a, b) => b.balance - a.balance);
                negativeBalances.sort((a, b) => a.balance - b.balance);
                
                let i = 0, j = 0;
                while (i < positiveBalances.length && j < negativeBalances.length) {
                    const creditor = positiveBalances[i];
                    const debtor = negativeBalances[j];
                    const amount = Math.min(creditor.balance, Math.abs(debtor.balance));
                    
                    if (amount > 0.01) {
                        suggestionsHTML += `
                            <div class="balance-item">
                                <span>${debtor.name} should pay ${creditor.name}</span>
                                <span class="positive">$${amount.toFixed(2)}</span>
                            </div>
                        `;
                        
                        creditor.balance -= amount;
                        debtor.balance += amount;
                        
                        if (creditor.balance === 0) i++;
                        if (debtor.balance === 0) j++;
                    } else {
                        break;
                    }
                }
                
                settlementSuggestions.innerHTML = suggestionsHTML;
            }
        }

       
        function recordSettlement() {
            const from = document.getElementById('fromUser').value;
            const to = document.getElementById('toUser').value;
            const amount = parseFloat(document.getElementById('settleAmount').value);
            
            if (!from || !to || !amount || amount <= 0) {
                alert('Please fill all fields with valid values');
                return;
            }
            
            if (from === to) {
                alert('Cannot settle with yourself');
                return;
            }
            
            const settlement = {
                id: Date.now().toString(),
                from: from,
                to: to,
                amount: amount,
                date: new Date().toLocaleDateString()
            };
            
            settlements.push(settlement);
            saveData();
            
            
            document.getElementById('settleAmount').value = '';
            
            
            showAlert('successAlert', 'Settlement recorded successfully!');
            
            
            updateBalances();
            updateSettlementUI();
        }

        
        function updateSettlementUI() {
            // Already handled in updateBalances
        }

       
        function updateStats() {
            const totalMembers = members.length;
            const totalExpenses = expenses.length;
            const totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);
            
            document.getElementById('totalMembers').textContent = totalMembers;
            document.getElementById('totalExpenses').textContent = totalExpenses;
            document.getElementById('totalAmount').textContent = '$' + totalAmount.toFixed(2);
        }

       
        function showTab(tabName) {
            
            document.querySelectorAll('.tab').forEach(tab => {
                tab.classList.remove('active');
            });
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            
            event.target.classList.add('active');
            document.getElementById(tabName + 'Tab').classList.add('active');
        }

        
        function showAlert(elementId, message) {
            const alertEl = document.getElementById(elementId);
            alertEl.querySelector('i').nextSibling.textContent = ' ' + message;
            alertEl.style.display = 'block';
            
            setTimeout(() => {
                alertEl.style.display = 'none';
            }, 3000);
        }

        
        function saveData() {
            localStorage.setItem('expenseSplitter_members', JSON.stringify(members));
            localStorage.setItem('expenseSplitter_expenses', JSON.stringify(expenses));
            localStorage.setItem('expenseSplitter_settlements', JSON.stringify(settlements));
        }

        
        function exportData() {
            const data = {
                members: members,
                expenses: expenses,
                settlements: settlements,
                exportDate: new Date().toISOString()
            };
            
            const dataStr = JSON.stringify(data, null, 2);
            const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
            
            const exportFileDefaultName = 'expense-splitter-data.json';
            
            const linkElement = document.createElement('a');
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', exportFileDefaultName);
            linkElement.click();
        }

        
        function importData() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json';
            
            input.onchange = e => {
                const file = e.target.files[0];
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    try {
                        const data = JSON.parse(e.target.result);
                        
                        if (data.members && data.expenses) {
                            if (confirm('This will replace all current data. Continue?')) {
                                members = data.members;
                                expenses = data.expenses;
                                settlements = data.settlements || [];
                                saveData();
                                
                                updateMembersList();
                                updateExpensesList();
                                updateBalances();
                                updateStats();
                                updateSettlementUI();
                                
                                alert('Data imported successfully!');
                            }
                        } else {
                            alert('Invalid data format');
                        }
                    } catch (error) {
                        alert('Error parsing file: ' + error.message);
                    }
                };
                
                reader.readAsText(file);
            };
            
            input.click();
        }

        
        function clearAllData() {
            if (confirm('Are you sure you want to clear ALL data? This cannot be undone.')) {
                members = [];
                expenses = [];
                settlements = [];
                saveData();
                
                updateMembersList();
                updateExpensesList();
                updateBalances();
                updateStats();
                updateSettlementUI();
                
                alert('All data cleared');
            }
        }

        
        function loadSampleData() {
            if (confirm('Load sample data? This will replace your current data.')) {
                members = [
                    { id: '1', name: 'Alice', balance: 0 },
                    { id: '2', name: 'Bob', balance: 0 },
                    { id: '3', name: 'Charlie', balance: 0 }
                ];
                
                expenses = [
                    {
                        id: '101',
                        title: 'Pizza Dinner',
                        amount: 45.00,
                        paidBy: '1',
                        splitBetween: ['1', '2', '3'],
                        splitAmount: 15.00,
                        date: new Date().toLocaleDateString()
                    },
                    {
                        id: '102',
                        title: 'Movie Tickets',
                        amount: 60.00,
                        paidBy: '2',
                        splitBetween: ['1', '2', '3'],
                        splitAmount: 20.00,
                        date: new Date().toLocaleDateString()
                    }
                ];
                
                settlements = [];
                
                saveData();
                
                updateMembersList();
                updateExpensesList();
                updateBalances();
                updateStats();
                updateSettlementUI();
                
                alert('Sample data loaded!');
            }
        }