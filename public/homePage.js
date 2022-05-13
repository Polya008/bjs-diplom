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
getRates();
setInterval(getRates, 60000);


const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = (data) => {
	ApiConnector.addMoney(data, response =>  {
		if(response.success){
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(true, 'Ваш баланс пополнен');
		} else {
			moneyManager.setMessage(false, response.error);
		}
	}
)};

moneyManager.conversionMoneyCallback = (money) => {
	ApiConnector.convertMoney(money, response => {
		if(response.success){
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(true, 'Конвертация прошла успешно');
		} else {
			moneyManager.setMessage(false, response.error);
		}
	}
)};

moneyManager.sendMoneyCallback = (send) => {
	ApiConnector.transferMoney(send, response => {
		if(response.success){
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(true, "Средства переведены");
		} else {
			moneyManager.setMessage(false, response.error);
		}
	}
)};

const myFavoritesWidget = new FavoritesWidget();
	ApiConnector.getFavorites(favore => {
		if(favore.success){
			myFavoritesWidget.clearTable();
			myFavoritesWidget.fillTable(favore.data);
			moneyManager.updateUsersList(favore.data);
		}
	});

myFavoritesWidget.addUserCallback = (data) => {
	ApiConnector.addUserToFavorites(data, response => {
		if(response.success){
			myFavoritesWidget.clearTable();
			myFavoritesWidget.fillTable(response.data);
			moneyManager.updateUsersList(response.data);
			myFavoritesWidget.setMessage(true, 'Пользователь успешно добавлен');
		} else {
			myFavoritesWidget.setMessage(false,response.error);
		}
	}
)};

myFavoritesWidget.removeUserCallback = (data) => {
	ApiConnector.removeUserFromFavorites(data, response => {
		if(response.success){
			myFavoritesWidget.clearTable();
			myFavoritesWidget.fillTable(response.data);
			moneyManager.updateUsersList(response.data);
			myFavoritesWidget.setMessage(true, /*response.data*/ 'Пользователь удалён из списка избранного');
		} else {
			myFavoritesWidget.setMessage(false, response.error);
		}
	}
)};