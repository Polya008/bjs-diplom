const logoutButton = new LogoutButton();
logoutButton.action = () => {
	ApiConnector.logout(response => {
		if(response.success){
			location.reload();
		} 
	})
};

ApiConnector.current(response => {
	if(response.success){
		ProfileWidget.showProfile(response.data);
	} 
});


const ratesBoard = new RatesBoard();
function getRates(){
	ApiConnector.getStocks(response => {
		if(response.success) {
			ratesBoard.clearTable();
			ratesBoard.fillTable(response.data);
		}
	})
}
setInterval(getRates, 60000);


const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = (data) => {
	ApiConnector.addMoney(data, response =>  {
		if(response.success){
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(isSucces, 'Ваш баланс пополнен');
		} else {
			moneyManager.setMessage(response.error);
		}
	}
)};

moneyManager.conversionMoneyCallback = (money) => {
	ApiConnector.convertMoney(money, response => {
		if(response.success){
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(isSucces);
		} else {
			moneyManager.setMessage(response.error);
		}
	}
)};

moneyManager.sendMoneyCallback = (send) => {
	ApiConnector.transferMoney(send, response => {
		if(response.success){
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(response.data);//был (isSucces)
		} else {
			moneyManager.setMessage(response.error);
		}
	}
)};

const myFavoritesWidget = new FavoritesWidget();
	ApiConnector.getFavorites(favore => {
		if(favore.success){
			myFavoritesWidget.clearTable();
			myFavoritesWidget.fillTable(favore.data);
			moneyManager.updateUserList(favore.data);
		}
	});

myFavoritesWidget.addUserCallback = (myUsers) => {
	ApiConnector.addUserToFavorites(myUsers, response => {
		if(response.success){
			myFavoritesWidget.clearTable();
			myFavoritesWidget.fillTable(response.data);
			moneyManager.updateUserList(response.data);//??
			myFavoritesWidget.favoritesMessageBox(response.data);
		} else {
			myFavoritesWidget.favoritesMessageBox(response.error);
		}
	}
)};

myFavoritesWidget.removeUserCallback = (goAway) => {
	ApiConnector.removeUserFromFavorites(goAway, response => {
		if(response.success){
			myFavoritesWidget.clearTable();
			myFavoritesWidget.fillTable(goAway.data);
			moneyManager.updateUserList(response.data);
			myFavoritesWidget.favoritesMessageBox(response.data);
		} else {
			myFavoritesWidget.favoritesMessageBox(response.error);
		}
	}
)};