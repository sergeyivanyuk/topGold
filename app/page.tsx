'use client'
import { Button } from '@/components/ui/Button'
import { StatCard } from '@/components/ui/StatCard'
import constants from '@/data/constants.json'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
export default function Home() {
	const router = useRouter()

	const handleBuyClick = () => {
		router.push('/slider')
	}

	return (
		<main className="flex flex-col items-center p-4">
			{/* Приветственный блок */}
			<div className="text-center mt-10 mb-10">
				<h1 className="text-gold-title  mb-2">Добро пожаловать на TopGold</h1>
				<p className="text-gray-subtext text-2xl">Покупай голду выгодно!</p>
				<div className="mt-8">
					<Button
						onClick={handleBuyClick}
						variant="gold"
						className="px-12 py-4 text-2xl w-full"
						aria-label="Перейти к покупке голды"
					>
						Купить
					</Button>
				</div>
			</div>

			{/* Статистика */}
			<div className="py-2 px-1 grid grid-cols-2 gap-2.5 w-full max-w-4xl">
				<StatCard
					iconSrc="/users.png"
					iconAlt="Игроки"
					label="Купило сегодня"
					value={constants.stats.playersToday}
				/>
				<StatCard
					iconSrc="/golds.png"
					iconAlt="Голда"
					label="Голды выдано"
					value={constants.stats.goldIssued}
					labelClassName="text-secondary-title"
				/>
			</div>
			{/* Пользователи и выплаты */}
			<div className="w-full mt-5 flex flex-col items-center  p-[10px] rounded-card bg-radial-gold border-gold-light outline-offset-[-1px]">
				<p className="text-stat-label mb-2.5">Выплачено пользователям</p>
				<div className="self-stretch h-0 opacity-40 outline-1 outline-offset-[-0.50px] outline-orange-200 my-2" />

				{constants.recentWins.slice(0, 3).map((win, index) => (
					<React.Fragment key={index}>
						<div className="flex w-full px-4 items-center justify-between">
							<p className="text-stat-label">{win.username}</p>
							<div className="text-stat-value flex items-center gap-0.5">
								<span className="text-[18px]">{win.gold}</span>
								<Image
									src="/golds.png"
									alt="Голда"
									width={20}
									height={20}
								/>
							</div>
						</div>
						{index < 2 && <div className="self-stretch h-0 opacity-40 outline-1 outline-offset-[-0.50px] outline-orange-200 my-2" />}
					</React.Fragment>
				))}
			</div>
		</main>
	)
}
