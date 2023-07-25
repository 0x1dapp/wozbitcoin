(function () {
	var parser_interval = 30;
	var min_value = 1000000;
	var max_value = 1000000000;
	var line_number = 10;
	var line_interval = 2;
	var flag = true;
	var interval_id;
	function get_bitcoin_data() {
		function time_from_unix(UNIX_timestamp){
 			var a = new Date(UNIX_timestamp * 1000);
  			var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  			var year = a.getFullYear();
  			var month = months[a.getMonth()];
  			var date = a.getDate();
  			var hour = a.getHours();
  			var min = (a.getMinutes() < 10 ? '0' : '') + a.getMinutes();
  			var sec = a.getSeconds();
  			var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min ;
  			return time;
		}
		var json_data = $.getJSON('https://blockchain.info/unconfirmed-transactions?format=json', function () {});
		json_data.always(function () {
			if (interval_id) {
				clearInterval(interval_id);
			}
			bitcoin_data = json_data.responseJSON['txs'];
			let i = 99;
			if (flag) {
				for(i = 0; flag = true; i++) {
					
				let rows_number = document.getElementById("bitcoin").rows.length;
				if(rows_number == line_number) {
					flag = false;
					i++;
					break;
				}
					if (bitcoin_data[i]['out'][0]['value'] > min_value && bitcoin_data[i]['out'][0]['value'] < max_value) {
					$("#bitcoin").append('<tr><td><div class="truncate"><a href=" https://www.blockchain.com/btc/tx/' + bitcoin_data[i]['hash'] + '" target="_blank" class="link-primary">' + bitcoin_data[i]['hash'] + '</div></td><td>' + time_from_unix(bitcoin_data[i]['time']) + '</td><td><span class="legend-indicator bg-success"></span>Received</td><td><div class="truncate-lg">' + bitcoin_data[i]['out'][0]['addr'] + '</div></td><td class="text-success">+' + (bitcoin_data[i]['out'][0]['value']/100000000) + ' BTC</td></tr>');
					}
				}
			}				
			interval_id = setInterval(() => {
				if (i < 1) {
					clearInterval(interval_id);
				}
				if (bitcoin_data[i]['out'][0]['value'] > min_value && bitcoin_data[i]['out'][0]['value'] < max_value) {
					$("#bitcoin").append('<tr><td><div class="truncate"><a href=" https://www.blockchain.com/btc/tx/' + bitcoin_data[i]['hash'] + '" target="_blank" class="link-primary">' + bitcoin_data[i]['hash'] + '</div></td><td>' + time_from_unix(bitcoin_data[i]['time']) + '</td><td><span class="legend-indicator bg-success"></span>Received</td><td><div class="truncate-lg">' + bitcoin_data[i]['out'][0]['addr'] + '</div></td><td class="text-success">+' + (bitcoin_data[i]['out'][0]['value']/100000000) + ' BTC</td></tr>');
				}
				let rows_number = document.getElementById("bitcoin").rows.length;
				if(rows_number > line_number) {
					$('#bitcoin tr:first').remove();
				}
				i -= 1;
			}, line_interval * 1000);	
		});
	}
	get_bitcoin_data();
	let timer_id = setInterval(() => get_bitcoin_data(), parser_interval * 1000);
}());