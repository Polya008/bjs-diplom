const logoutButton = new LogoutButton();
logoutButton.action = () => {
	ApiConnector.logout(response => {
		if(response.success){
			location.reload();
		} 
	})
}

ApiConnector.current(response => {
	if(response.success){
		ProfileWidget.showProfile(response.data);
	} 
})


const ratesBoard = new RatesBoard();
	ApiConnector.getStocks(response => {
		if(callback.success) {
			ratesBoard.clearTable();
			ratesBoard.fillTable(callback.data);
	};
	setInterval(() => getStocks(), 1000);
});


const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = (data) => {
	ApiConnector.addMoney({ currency, amount }, callback)
}



