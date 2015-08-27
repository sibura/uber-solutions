exports.ProblmCateg = function(req, res, next){
	req.getConnection(function(error, connection){
		if(error){
			return next(error);
		}

		connection.query('SELECT *  FROM Problem_Categories;', [], function(error, results) {
			if (error) {
				return next(error);
			}
			console.log(results);
			res.render('CategProblms', {
				problems : results
			});
		});
	});		
};