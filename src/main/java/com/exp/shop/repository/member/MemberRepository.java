package com.exp.shop.repository.member;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.exp.shop.model.member.Member;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
	Member findByMem_id(String memId);
}
