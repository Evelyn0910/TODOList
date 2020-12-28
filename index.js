var doing_ul = document.getElementById('doingul');
var done_ul = document.getElementById('doneul');
var add_btn = document.getElementById('add');
var input = document.getElementsByTagName('input');
var _id;
var have_checked;

function add(){
	have_checked = '0';
	_id = 0;
	//获取value为空时的_id
	while(localStorage.getItem(_id)) _id++;
	//将item添加到localStorage中
	localStorage.setItem(_id, input[0].value+have_checked);
	load();
}

function del(id){
	//循环覆盖需删除的id
	for(;localStorage.getItem(id+1);id++)
		localStorage.setItem(id, localStorage.getItem(id+1));
	//删除最后一个节点
	localStorage.removeItem(id);
	load();
}

function check(i){
	var item_length = localStorage.getItem(i).length;
	have_checked = localStorage.getItem(i)[item_length-1] === '0' ? '1' : '0';
	localStorage.setItem(i, localStorage.getItem(i).slice(0, localStorage.getItem(i).length-1 ) + have_checked);
	load();
}

function update(i){
	var span = document.getElementById('sp-'+i);
	var item_length = localStorage.getItem(i).length;
	span.innerHTML = '<input type="text" id="up-'+ i +'" value="' + localStorage.getItem(i).slice(0,item_length-1) + '">';
	var up_input = document.getElementById('up-'+i);
	up_input.setSelectionRange(0, localStorage.getItem(i).length);
	up_input.focus();
	up_input.onblur = function(){
		localStorage.setItem(i, up_input.value + localStorage.getItem(i)[item_length-1]);
		load();
	};
}

function load(){
	doing_ul.innerText = '';
	done_ul.innerText = '';
	input[0].value='';
	for(var i = 0;localStorage.getItem(i);i++){
		var item_length = localStorage.getItem(i).length;
		var doing_li = document.createElement('li');

		if(localStorage.getItem(i)[item_length-1] === '0'){	
			doing_li.innerHTML = '<input class="check_b" type="checkbox" onclick="check(' + i +')"><span id="sp-'+i+'" ondblclick="update(' + i + ')">' + 
				localStorage.getItem(i).slice(0,item_length-1) + 
					'</span><input class="del" type="button" onclick="del(' + i + ')" value="删除">';
			doing_ul.appendChild(doing_li);
		}else{
			doing_li.innerHTML = '<input class="check_b" type="checkbox" checked="checked" onclick="check(' + i +')"><span id="sp-'+i+'" ondblclick="update(' + i + ')">' + 
			localStorage.getItem(i).slice(0,item_length-1) + 
				'</span><input class="del" type="button" onclick="del(' + i + ')" value="删除">';
			done_ul.appendChild(doing_li);
		}
	}
}
window.onload = load;