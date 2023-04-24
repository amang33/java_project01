package com.exp.shop.controller.member;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.exp.shop.dto.member.MemberDTO;
import com.exp.shop.service.member.MemberService;

@Controller
@RequestMapping("/member")
public class MemberController {
	
	private final MemberService memberService;
	
	@Autowired
	public MemberController(MemberService memberService) {
		this.memberService = memberService;
	}

	@GetMapping("/mem_login")
	public String mem_login() {
		return "/member/mem_login";
	}

	@GetMapping("/mem_join01")
	public String mem_join() {
		return "/member/mem_join01";
	}

	@GetMapping("/mem_join02")
	public String mem_info_in() {
		return "/member/mem_join02";
	}

	@PostMapping("/idChk")
	public ResponseEntity<Map<String, Boolean>> chk_mem_id(@RequestBody Map<String, String> request) {
		String in_id = request.get("mem_id");
		boolean isDuplicated = memberService.isDuplicatedId(in_id);

		Map<String, Boolean> result = new HashMap<>();
		result.put("isDuplicated", isDuplicated);

		return ResponseEntity.ok(result);
	}
	
	@PostMapping("/in_member")
	public String insertMember(MemberDTO memberDTO) {
		memberService.insertMember(memberDTO);
		
		return "redirect:/main";
	}

}
