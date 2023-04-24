package com.exp.shop.service.member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exp.shop.dto.member.MemberDTO;
import com.exp.shop.model.member.Member;
import com.exp.shop.repository.member.MemberRepository;

@Service
public class MemberService {
	private final MemberRepository memberRepository;
	
	@Autowired
	public MemberService(MemberRepository memberRepository) {
		this.memberRepository = memberRepository;
	}
	
	public boolean isDuplicatedId(String id) {
		Member member = memberRepository.findByMem_id(id);
		
		return member != null;
	}
	
	public void insertMember(MemberDTO memberDTO) {
		Member member = new Member();
		
		member.setMem_id(memberDTO.getMem_id());
		member.setMem_name(memberDTO.getMem_name());
		member.setMem_pwd(memberDTO.getMem_pwd());
		member.setMem_hp(memberDTO.getMem_hp());
		
		memberRepository.save(member);
	}
}
