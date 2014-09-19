	//iPhoneModel 0 : iPhone 6 
	//iPhoneModel 1 : iPhone 6 Plus
	var iphoneModel = 1
	//capacity = [16G, 64G, 128G]
	var capacity = [0,0,1]
	//Select Color Priority: 0 = Silver, 1 = Gold, 2 = Space Grey
	var colorPos = [1,0,2];
	//Select Color Priority: 1 = CWB, 2 = FW, 3 = IFC
	var shopPriority = [1,3,2];
	//User Information
	var firstname = "Kwan Yat";
	var lastname = "Wong";
	var email = "daywong1119@gmail.com";
	var phone = "61780236";
	var govId = "R1512012";

	/* Global variables */
	var mainProcess;
	var shopIdx = 0;
	
	var store_hash = {};

	$.ajax({
		url:"availability.json",     
		dataType:"json",
		success:function(data){

        	console.log(data.R120);
        	$("#text1").append("Updated at: "+data.updated+"<br>");
			
			$.each(data, function (storeId, store_value) {
				var product_hash = {};
				$.each(store_value,function(productNo,value){
					product_hash[productNo] = value;
					/*
					if (value == false) {
						$("#text1").append(productConvertor(productNo)+": "+"false"+"<br>");
					}else{
						$("#text1").append(productConvertor(productNo)+": "+"true"+"<br>");
					}
					*/
				});
				store_hash[storeId] = product_hash
			});
        },  
			error: function(XMLHttpRequest, textStatus, errorThrown) {
        	console.log("");                   
        }
		// To use hashmap: var value = store_hash['storeId']['productNo'] <== true / false;
    });
	
	
	// R428 = IFC
    // R409 = CWB
    // R485 = KLN
	// Prior by yourself

	function PriorProduct(product_idx) {
		if (product_idx >= product_list.length) return;
		for (var i = 0; i < store_list.length; i++) {
			if ( store_hash[store_list[i]][product_list[product_idx]] == "true" ) {
				// do something
				return;
			}
		}
		PriorProduct(++product_idx);
	}

	function codeInjector(injection){
		var injectedCode = injection;
		var script = document.createElement('script');
		script.appendChild(document.createTextNode('('+ injectedCode +')();'));
		(document.body || document.head || document.documentElement).appendChild(script);
	}
	
	function setShop(){
		var disabled = $("#productSelection li select[name='selectedStoreNumber'] option").closest("li").hasClass("disabled");
		if(!disabled){
			var shops = [];
			$("#productSelection li select[name='selectedStoreNumber'] option").each(function(index){
					shops[index] = $(this).val();
			})
			console.log('Set Shop = ' + shops[shopPriority[shopIdx]]);
			$("#productSelection li select[name='selectedStoreNumber']").each(function(index){
			   codeInjector("$('#productSelection li select[name=\"selectedStoreNumber\"]').val('" + shops[shopPriority[shopIdx]] + "').trigger('change')");
			})
			return true
		}else{
			return false
		}
	}
	
	function setIphone(){
		var disabled = $("#productSelection #product").closest("li").hasClass("disabled");
		if(!disabled){		
			   codeInjector("$('#productSelection #product ul li:eq(" + iphoneModel + ") input').click()");
			return true
		}else{
			return false
		}
	}
	
	function setNoContract(){
		var disabled = $("#productSelection #locked").closest("li").hasClass("disabled");
		if(!disabled){
			codeInjector('$(\"#productSelection #locked ul li:eq(0) input\").click()');
			return true
		}else{
			return false
		}
	}
	
	var i = 0;
	var colorIndexing = [];
	function setColor(){
		if( i <= 2 ){
		var disabled = $("#productSelection #color").closest("li").hasClass("disabled")
			if( !disabled ){
				$("#productSelection #color li:visible").each(function(index){
					colorIndexing[index] =  $(this).index();
				})
				codeInjector("$('#productSelection #color input:eq(\""+colorIndexing[colorPos[i]]+"\")').click()");
				i++;
				return true
			}else{
				return false
			}
		}else{
			i = 0;
			rollback(3);
			return false
		}
	}

	//var modelIndex = 0;
	//return 0 = option disabled ,1 = No Stock, 2 = Selected
	function setModel(){
		var disabled = $("#productSelection #model").closest('li').hasClass('disabled');
		if( !disabled ){
			var modelSelected = 1;
			$("#productSelection #model ul li:visible input").each(function(i){
				if( $(this).attr("disabled") == undefined && capacity[i] == 1 ){
					$(this).click().trigger('change');
					modelSelected = 2;
					return false
				}
			})
			return modelSelected
		}else{
			return 0
		}
	}
	function setQuan(){
		var disabled = $("#productSelection li select[name='selectedQuantity']").closest('li').hasClass('disabled');	
		if( !disabled ){
			$("#productSelection li select[name='selectedQuantity']").each(function(index){
				$(this).val("2").trigger('change');
			})
			return true
		}else{
			return false
		}
	}

	function setInfo(){
		$("#productSelection #contact input[name='firstName']").val( firstname ).trigger('change');
		$("#productSelection #contact input[name='lastName']").val( lastname ).trigger('change');
		$("#productSelection #contact input[name='email']").val( email ).trigger('change');
		codeInjector("$('#productSelection #contact input[name=\"phoneNumber\"]').val('" + phone + "').trigger('change').click()");
		return true
	}
	
	function setGovId() {
		$("#productSelection li select[name='selectedGovtIdType'] option").closest("li").hasClass("disabled");
		var disabled = $("#productSelection li select[name=\"selectedGovtIdType\"] option").closest("li").hasClass("disabled");
		if ( !disabled ) {
			var gov_type = [];
			$("#productSelection li select[name='selectedGovtIdType'] option").each(function(index) {
				gov_type[index] = $(this).val();
			});
			console.log('Gov Type = ' + gov_type);
			console.log('Type = ' + gov_type[1]);
			$("#productSelection li select[name='selectedGovtIdType']").each(function(index) {
				codeInjector("$('#productSelection li select[name=\"selectedGovtIdType\"]').val('" + gov_type[1] + "').trigger('change')");
			});
			codeInjector("$('#productSelection #govt-id input[name=\"govtId\"]').val('" + govId + "').trigger('change').click()");

			return true;
		} else {
			return false;
		}
	}



	function setTimeslot(){
		var exsist = $("#productSelection li select[name='selectedTimeSlotId'] option").closest('li');
		if( exsist != undefined){
			var timeslot = [];
			$("#productSelection li select[name='selectedTimeSlotId'] option").each(function(index){
				timeslot[index] = $(this).val();
			})
			codeInjector("$('#productSelection li select[name=\"selectedTimeSlotId\"]\').each(function(index){ $(this).val('"+timeslot[9]+"').trigger('change') })");
			return true
		}else{
			return false
		}
	}
	
	function submit(){
		$("#globalfooter").nextAll('script');
		$(".button-container a.button").click();
		$("#productSelection .button-container a").click();
		stop();
	}
	
	function stop(){
		clearInterval(mainProcess);
	}
	
	function rollback(currentStep){
		console.log('rollback');
		switch(step) {
			case 1:
				step--
				if(shopIdx < shopPriority.length-1)
					shopIdx++;
				else
					stop();
				break;
			case 3:
				step = 0
				if(shopIdx < shopPriority.length-1)
					shopIdx++;
				else
					stop();

				break;
		}
	}

	var step = 0;
	var lastStep = 0;
	var stepCount = 0;
	var modelAttepted = 0;
	function mainThread(){
		console.log('step ' + step);
		switch(step) {
			case 0:
				if(setShop())
					step++;
				break;
			case 1:
				if(setIphone())
					step++;
				break;
			case 2:
				if(setNoContract())
					step++;
				break;
			case 3:
				if(setColor())
					step++;
				break;
			case 4:
				var k = setModel()
				if( k == 1)
					step--;
				else if( k == 2)
					step++;
				break;
			case 5:
				if(setQuan())
					step++; 
				break;
			case 6:
				if(setInfo())
					step++;
				break;
			case 7:
				if(setGovId())
					step++;
				break;
			case 8:
				if(setTimeslot())
					step++;
				break;
			case 9:
				submit();
			break;
		}
		if(step == lastStep)
			stepCount++;
		else
			lastStep = step;

		if(stepCount > 10 && step != 9){
			rollback(step);
			stepCount = 0;
		}
	}
	
	function bootup(){
		if($(".loading-container:visible").length == 0){
			if($("#productSelection").length > 0 && $("#productSelection").attr("method") == "post"){
				mainProcess = setInterval(function(){mainThread()},500);
			}
			return true
		}
		return false
	}
	
	var bootstrap = setInterval(function(){
		var started = bootup();
		if(started)
			clearInterval(bootstrap);
		else
			console.log('waiting for the website...');
	},500);
