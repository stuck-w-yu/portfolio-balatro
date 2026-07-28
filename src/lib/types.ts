export type Edition = 'none' | 'foil' | 'holo' | 'poly' | 'negative';
export type Suit = 'spade' | 'heart' | 'diamond' | 'club';
export type Rank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';
export type Rarity = 'common' | 'rare' | 'legendary';
export type BlindType = 'small' | 'big' | 'boss';
export type BadgeKind = 'chip' | 'mult' | 'money' | 'neutral';
export type ScreenId = 'menu' | 'projects' | 'collection' | 'stats' | 'blinds' | 'shop';
export type ButtonVariant = 'primary' | 'danger' | 'success' | 'neutral';

export interface Profile {
	name: string;
	alias: string;
	role: string;
	location: string;
	bio: string;
	avatar: string;
	stats: { label: string; value: string }[];
}

export interface Project {
	id: string;
	title: string;
	art: string;
	rarity: Rarity;
	edition: Edition;
	summary: string;
	description: string;
	tags: string[];
	links: { label: string; url: string }[];
	impact: { chips: number; mult: number };
}

export interface Skill {
	id: string;
	label: string;
	kind: BadgeKind;
	level: number;
	note: string;
}

export interface Experience {
	id: string;
	type: BlindType;
	role: string;
	company: string;
	period: string;
	reward: string;
	icon: string;
	details: string;
}

export interface Social {
	id: string;
	label: string;
	url: string;
	icon: string;
	price: string;
}
