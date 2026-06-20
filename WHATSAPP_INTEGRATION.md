# WhatsApp Order Integration

## Overview
The ipearls Soap e-commerce website uses WhatsApp as the primary ordering method. Customers can send their cart details directly to the business WhatsApp number: **+91 9323626985**

## Features

### 1. WhatsApp Utility Function (`lib/whatsapp.ts`)
- **`generateWhatsAppMessage(orderDetails)`** - Formats customer details and cart items into a readable message
- **`sendWhatsAppMessage(phoneNumber, orderDetails)`** - Opens WhatsApp with the pre-formatted message

### 2. Cart Drawer WhatsApp Option
- Located in bottom-right cart drawer
- Green button with chat emoji: "💬 Order via WhatsApp"
- Customers can order directly from cart without filling the checkout form
- Message includes:
  - All cart items with quantities
  - Total order amount

### 3. Checkout Page WhatsApp Option
- "💬 Place Order via WhatsApp" button available
- Requires customers to fill delivery details before sending
- Message includes:
  - Full customer information (name, email, phone, address, city, PIN)
  - All ordered items with details
  - Total amount

## How It Works

### Message Format
```
*ipearls Soap Order*

*Customer Details:*
Name: [Customer Name]
Email: [Email]
Phone: [Phone Number]
Address: [Address]
City: [City]
PIN Code: [PIN Code]

*Order Items:*
1. [Product Name]
   Quantity: [Qty]
   Price: ₹[Price] each
   Total: ₹[Item Total]

*Order Total: ₹[Total Amount]*
```

### WhatsApp URL
The integration uses the WhatsApp API link format:
```
https://wa.me/{phoneNumber}?text={encodedMessage}
```

Where:
- `phoneNumber` = 9323626985 (without country code +91)
- `encodedMessage` = URL-encoded message with order details

## Integration Points

### Files Modified/Created:
1. **`lib/whatsapp.ts`** - WhatsApp utility functions
2. **`components/checkout-form.tsx`** - Added WhatsApp button to checkout form
3. **`components/cart-drawer.tsx`** - Added WhatsApp quick order button to cart

### Business WhatsApp Number
- **Default Number**: 9323626985
- To change the number, update the value in:
  - `components/checkout-form.tsx` (line: `sendWhatsAppMessage('9323626985', ...)`)
  - `components/cart-drawer.tsx` (line: `sendWhatsAppMessage('9323626985', ...)`)

## User Experience

### Workflow A: Quick Order (Cart Drawer)
1. Customer adds items to cart
2. Clicks "💬 Order via WhatsApp" button in cart drawer
3. WhatsApp opens with pre-filled message showing cart items
4. Customer confirms and sends to business

### Workflow B: Complete Order (Checkout Form)
1. Customer fills delivery details in checkout form
2. Chooses "💬 Order via WhatsApp" instead of Razorpay
3. WhatsApp opens with complete order details including address
4. Business receives full order information with customer location

## Benefits

✅ **No Additional Infrastructure** - Uses existing WhatsApp Business API  
✅ **Flexible Payment** - Business can negotiate payment method via WhatsApp  
✅ **Personal Touch** - Direct conversation with customer  
✅ **Regional Preference** - Popular payment method in India (UPI, Cash on Delivery)  
✅ **Accessibility** - Works on all devices with WhatsApp

## Testing WhatsApp Integration

To test the WhatsApp button:

1. **In Cart**: Add items → Click cart button → Click "💬 Order via WhatsApp"
2. **In Checkout**: Fill form → Click "💬 Order via WhatsApp"

**Note**: WhatsApp will open in a new tab. The business will receive the pre-formatted message.

## Future Enhancements

- Add WhatsApp Business API integration for automated responses
- Track orders via WhatsApp
- Send order confirmations back to customer
- Integrate WhatsApp with inventory management system
