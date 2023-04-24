const join01_js = {
	cbAll : document.querySelectorAll(".check_item"), 
	fn_chk_box : function () {
		let frm = document.querySelector("#join01_frm");
		
		for(let i = 0; i < this.cbAll.length;i++) {
			if(this.cbAll[i].checked == false) {
				alert("약관에 모두 동의 후 다음으로 진행이 가능합니다.");
				return false;
			}
		}
		
		frm.submit();
	}, 
	fn_chk_all : function () {
		for(let i = 0; i < this.cbAll.length;i++) {
			this.cbAll[i].checked = true;
		}
	}
}

const join02_js = {
	mem_id : document.querySelector("#mem_id"), 
	id_chk_count : 0, 
	fn_id_chk : function () {
		if(this.mem_id.value.trim() == "" || this.mem_id.value.trim() == null) {
			alert("사용하실 아이디를 먼저 입력해 주세요.");
			this.mem_id.focus();
			
			return false;
		}
		
		const id_pattern = /^[a-zA-Z0-9]{5,20}$/; // 아이디 패턴 정규식
		
		if(!id_pattern.test(this.mem_id.value.trim())) {
			alert("아이디는 5~20자의 영문 대소문자와 숫자로만 입력해주세요.");
			this.mem_id.focus();
			
			return false;
		}
		
		fetch("/member/idChk", {
			method 	: "POST", 
			body		: JSON.stringify({mem_id : this.mem_id.value}), 
			headers	: {
				"Content-Type" : "application/json"
			}
		})
		.then(response => response.json())
		.then(data => {
			if(data.isDuplicated === false) {
				alert("사용 가능한 아이디 입니다.");
				this.id_chk_count = 1;
			} else {
				alert("이미 사용중인 아이디 입니다.");
				mem_id.value = "";
				mem_id.focus();
			}
		})
		.catch(error => {
			console.log(error);
			alert("'에러' 관리자에게 문의 주세요");
		});
	}, 
	pwd_pattern_chk : function (in_text) {
		const pwd_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
		let pwd_info_area = document.querySelector("#pwd_effectiveness01");
		
		if(!pwd_pattern.test(in_text.value.trim())) {
			pwd_info_area.innerHTML = "사용 불가능한 비밀번호 입니다.";
			pwd_info_area.className = "mem_warning01";
		} else {
			pwd_info_area.innerHTML = "사용 가능한 비밀번호 입니다.";
			pwd_info_area.className = "mem_warning02";
		}
	},
	pwd_chk : function(mem_pwd_chk) {
		let pwd_info_area = document.querySelector("#pwd_effectiveness02");
		let mem_pwd = document.querySelector("#mem_pwd");
		
		if(mem_pwd_chk.value.trim() != mem_pwd.value.trim()) {
			pwd_info_area.innerHTML = "비밀번호와 일치하지 않습니다.";
			pwd_info_area.className = "mem_warning01";
		} else {
			pwd_info_area.innerHTML = "입력한 비밀번호와 일치합니다.";
			pwd_info_area.className = "mem_warning02";
		}
	},
	phone : function(in_phone) {
		let phone_number = in_phone.value.replace(/-/g, "");
		let text_chk = phone_number.replace(/\D/g, "");
		
		in_phone.value = text_chk.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
	},
	fn_all_ok : function () {
		let frm = document.querySelector("#join02_frm");
		let mem_id = this.mem_id;
		let mem_name = frm.mem_name;
		let mem_pwd = frm.mem_pwd;
		let mem_hp = frm.mem_hp;
		
		if(mem_id.value.trim() == "" || mem_id.value.trim() == null) {
			alert("아이디를 입력해 주세요.");
			
			mem_id.focus();
			return false;
		}
		
		if(this.id_chk_count == 0) {
			alert("아이디 중복 확인을 해주세요.");
			
			return false;
		}
		
		if(mem_name.value.trim() == "" || mem_name.value.trim() == null) {
			alert("이름을 입력해 주세요.");
			
			mem_name.focus();
			return false;
		}
		
		if(mem_pwd.value.trim() == "" || mem_pwd.value.trim() == null) {
			alert("비밀번호를 입력해 주세요.");
			
			mem_pwd.focus();
			return false;
		}
		
		if(mem_hp.value.trim() == "" || mem_hp.value.trim() == null) {
			alert("핸드폰 번호를 입력해 주세요.");
			
			mem_hp.focus();
			return false;
		}

		frm.action = "/member/in_member";
		frm.submit();
	}
}
