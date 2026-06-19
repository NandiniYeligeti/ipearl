export interface OrderDetails {
  name: string
  email: string
  phone: string
  address: string
  city: string
  pincode: string
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
  }>
  total: number
}

export const generateWhatsAppMessage = (orderDetails: OrderDetails): string => {
  const { name, email, phone, address, city, pincode, items, total } = orderDetails

  let message = `*Luxe Soap Order*\n\n`
  message += `*Customer Details:*\n`
  message += `Name: ${name}\n`
  message += `Email: ${email}\n`
  message += `Phone: ${phone}\n`
  message += `Address: ${address}\n`
  message += `City: ${city}\n`
  message += `PIN Code: ${pincode}\n\n`

  message += `*Order Items:*\n`
  items.forEach((item, index) => {
    message += `${index + 1}. ${item.name}\n`
    message += `   Quantity: ${item.quantity}\n`
    message += `   Price: ₹${item.price} each\n`
    message += `   Total: ₹${item.price * item.quantity}\n`
  })

  message += `\n*Order Total: ₹${total}*\n`

  return message
}

export const sendWhatsAppMessage = (
  phoneNumber: string,
  orderDetails: OrderDetails,
): void => {
  const message = generateWhatsAppMessage(orderDetails)
  const encodedMessage = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
  window.open(whatsappUrl, '_blank')
}
