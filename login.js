var aws_cognito = require('amazon-cognito-identity-js');
exports.loginHandler =  async (event,context) => {
    var ID = event.username;
		var pwd = event.pwd;
		// ユーザープール設定
		var user_pool = new aws_cognito.CognitoUserPool({
			UserPoolId : 'us-east-2_qVLvPbwuK',
			ClientId : '27ql7h1u9jhtscq10cnqckru9a'
		});
		
		// ユーザー決定
		const cognito_user = new aws_cognito.CognitoUser({
			Username: ID,
			Pool: user_pool,
		});
		
		// パスワードの設定
		const authentication_details = new aws_cognito.AuthenticationDetails({
			Password: pwd,
		});
		// ユーザープール／ユーザー／パスワードを使って認証
		cognito_user.authenticateUser(authentication_details, {
			// 成功時
			onSuccess(result){
			    const response = {
                    statusCode: 200,
                    body: JSON.stringify('成功登録'),
                };
                return response;
			},
			onFailure(err){
				console.error(err);
			},
		
			// ####################################################################################
			// 初回認証時はパスワードの変更が要求されるので、仮パスワードと同じパスワードを再設定する
			// newPasswordRequired(user_attributes, required_attributes){
			//     cognito_user.completeNewPasswordChallenge(authentication_details.password, user_attributes, this);
			// },
			// ####################################################################################
		});
}