package com.exp.shop.model.member;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "mem_info")
public class Member {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long mem_num;
	
	@Column(name="mem_id")
	private String mem_id;
	@Column(name="mem_name")
	private String mem_name;
	@Column(name="mem_pwd")
	private String mem_pwd;
	@Column(name="mem_hp")
	private String mem_hp;
	@Column(name="mem_rank")
	private String mem_rank = "5";
	@Column(name="mem_join_date")
	private LocalDateTime mem_join_date = LocalDateTime.now();
}
