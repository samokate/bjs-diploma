//Решение первой части задания

'use strict';

class Profile {
    constructor({userName, name: {firstName, lastName}, password}) {
        this.userName = userName;
        this.name = {
            firstName,
            lastName
        }
        this.password = password;
    }
    
    createUser(callback) {
        return ApiConnector.createUser(
            {
                userName: this.userName,
                name: this.name,
                password: this.password
            }, (err,data) => {
            console.log(`User ${this.userName} created`);
            callback(err, data);
            }
        )
    }

    userLogin(callback) {
        return ApiConnector.userLogin(
            {
                userName: this.userName,
                password: this.password
            }, (err, data) => {
                console.log(`User ${this.userName} authorized`);
                callback(err, data);
            }
        )
    }

    addMoney({currency, amount}, callback) {
        return ApiConnector.addMoney({currency, amount}, (err,data) => 
            {
                console.log(`${this.userName} added ${this.amount} ${this.currency}`);
                callback(err, data);
            }
        )
    }

    currencyExchange({fromCurrency, targetCurrency, targetAmount}, callback) {
            return ApiConnector.currencyExchange({fromCurrency, targetCurrency, targetAmount}, (err, data) =>
            {
                console.log(`${fromCurrency} exchanged to ${targetAmount} ${targetCurrency}`);
                callback(err, data);
            }
        )
    }

    transferMoney({toUser, amount}, callback) {
        return ApiConnector.transferMoney({toUser, amount}, (err, data) =>
            {
            console.log(`Transfer ${amount} to ${toUser}`);
            callback(err, data);
            }
        )
    }
}

function getStocks(callback) {
    return ApiConnector.getStocks((err, data) => 
        {
        console.log(`Current stocks`);
        callback(err, data[99]);
        }
    )
}

function main() {
    const user1 = new Profile(
        {
            userName: 'Vanya',
            name: {firstName: 'Ivan', lastName: 'Ivanov'},
            password: 'user1pass'
        }
    );

    const user2 = new Profile(
        {
            userName: 'Petya',
            name: {firstName: 'Petr', lastName: 'Petrov'},
            password: 'user2pass'
        }
    );
//создаём пользователя
    user1.createUser( (err, data) => {
        if (err) {
            console.error(`Error during creating ${user1.userName}`);
        } else {
            console.log(`User ${user1.userName} successfully created`);
                //логиним юзера
            user1.userLogin( (err, data) => {
                if (err) {
                    console.error(`Error during authorization ${user1.userName}`);
                } else {
                    console.log(`User ${user1.userName} successfully logged in`);
                    //добавляем денег в кошелек
                    user1.addMoney({ currency: 'RUB', amount: 500000 },(err, data) => {                            
                        if (err) {
                            console.error('Error while adding money');
                        } else {
                            console.log(`${user1.userName} added ${amount} ${currency}`);
                            //конвертация валют
                            user1.currencyExchange({fromCurrency: 'RUB', targetCurrency: 'NETCOIN', targetAmount: 100}, (err, data) => {
                                if (err) {
                                    console.error(`Error converting money from RUB to NETCOIN`);
                                } else {
                                    console.log(`Successfully converted`);
                                    user2.createUser( (err, data) => {
                                        if (err) {
                                        console.error(`Error during creating ${user2.userName}`);
                                        } else {
                                            console.log(`User ${user2.userName} successfully created`);
                                            user1.transferMoney({toUser: user2.userName, amount: targetAmount}, (err, data) => {
                                                if (err) {
                                                    console.error('Transfer failed');
                                                } else {
                                                    console.log(`${user2} delivered ${targetAmount} NETCOINS successfully`);
                                                }
                                            });            
                                        }
                                    });    
                                }
                            });                
                        }
                    });                    
                }
            });        
        }
    });
}

main();