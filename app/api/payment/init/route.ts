import { getPaymentService } from '@/services/payment/payment.service'
import { PaymentMethod, PaymentRequest } from '@/types/payment'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
	try {
		const body = await request.json()
		const { tariff, price, paymentMethod, nickname, email, phone, promoCode } = body

		// Валидация обязательных полей
		if (!tariff || !price || !paymentMethod) {
			return NextResponse.json({ error: 'Необходимые поля: tariff, price, paymentMethod' }, { status: 400 })
		}

		// Проверка корректности метода оплаты
		const validMethods = Object.values(PaymentMethod)
		if (!validMethods.includes(paymentMethod as PaymentMethod)) {
			return NextResponse.json({ error: `Недопустимый метод оплаты. Допустимые: ${validMethods.join(', ')}` }, { status: 400 })
		}

		// Если nickname не указан, используем значение по умолчанию
		const finalNickname = nickname?.trim() || 'guest'

		const paymentRequest: PaymentRequest = {
			tariff,
			price: Number(price),
			paymentMethod: paymentMethod as PaymentMethod,
			nickname: finalNickname,
			email,
			phone,
			promoCode
		}

		const paymentService = await getPaymentService()
		const paymentResponse = await paymentService.initPayment(paymentRequest)

		return NextResponse.json(paymentResponse, { status: 200 })
	} catch (error) {
		console.error('Ошибка при инициализации платежа:', error)
		return NextResponse.json({ error: 'Внутренняя ошибка сервера' }, { status: 500 })
	}
}
