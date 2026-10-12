<!DOCTYPE html>
<html lang="hi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>डेयरी प्रोडक्ट ऑनलाइन ऑर्डर</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            background-color: #e0f7fa; 
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            padding: 20px 0;
        }
        .order-box { 
            background: white; 
            padding: 20px; 
            border-radius: 12px; 
            box-shadow: 0 4px 10px rgba(0,0,0,0.1); 
            width: 350px;
        }
        h2 { color: #2e7d32; text-align: center; font-size: 20px; margin-top: 0; }
        label { font-weight: bold; font-size: 14px; color: #333; display: block; margin-top: 10px; }
        input[type="text"], input[type="tel"] { 
            width: 100%; 
            padding: 10px; 
            margin: 6px 0 12px 0; 
            box-sizing: border-box; 
            border: 1px solid #ccc;
            border-radius: 6px;
        }
        .item-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px dashed #eee;
        }
        .item-info {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
        }
        .qty-input {
            width: 50px;
            padding: 5px;
            text-align: center;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
        .total-box {
            font-size: 16px;
            font-weight: bold;
            color: #d32f2f;
            text-align: right;
            margin: 15px 0;
        }
        .btn-wa { 
            background-color: #25D366; 
            color: white; 
            border: none; 
            padding: 12px; 
            border-radius: 6px; 
            cursor: pointer; 
            font-weight: bold; 
            width: 100%; 
            margin-bottom: 10px;
            font-size: 15px;
        }
        .btn-sms { 
            background-color: #007bff; 
            color: white; 
            border: none; 
            padding: 12px; 
            border-radius: 6px; 
            cursor: pointer; 
            font-weight: bold; 
            width: 100%; 
            font-size: 15px;
        }
    </style>
</head>
<body>

    <div class="order-box">
        <h2>🍼 डेयरी ऑर्डर फॉर्म</h2>
        
        <label>आपका नाम:</label>
        <input type="text" id="custName" placeholder="अपना नाम लिखें">

        <label>मोबाइल नंबर:</label>
        <input type="tel" id="custPhone" placeholder="अपना फोन नंबर">

        <label>सामान चुनें और मात्रा दर्ज करें:</label>
        
        <div class="item-row">
            <div class="item-info">
                <input type="checkbox" class="item-check" value="ताज़ा दूध (1 लीटर)" data-price="60" onchange="calculateTotal()">
                <span>ताज़ा दूध (1L) - ₹60</span>
            </div>
            <input type="number" class="qty-input" value="1" min="1" onchange="calculateTotal()">
        </div>

        <div class="item-row">
            <div class="item-info">
                <input type="checkbox" class="item-check" value="ताज़ी दही (500 ग्राम)" data-price="35" onchange="calculateTotal()">
                <span>ताज़ी दही (500g) - ₹35</span>
            </div>
            <input type="number" class="qty-input" value="1" min="1" onchange="calculateTotal()">
        </div>

        <div class="item-row">
            <div class="item-info">
                <input type="checkbox" class="item-check" value="पनीर / छेना (1 किग्रा)" data-price="300" onchange="calculateTotal()">
                <span>पनीर (1kg) - ₹300</span>
            </div>
            <input type="number" class="qty-input" value="1" min="1" onchange="calculateTotal()">
        </div>

        <div class="item-row">
            <div class="item-info">
                <input type="checkbox" class="item-check" value="मक्खन (200 ग्राम)" data-price="100" onchange="calculateTotal()">
                <span>मक्खन (200g) - ₹100</span>
            </div>
            <input type="number" class="qty-input" value="1" min="1" onchange="calculateTotal()">
        </div>

        <div class="total-box">
            कुल राशि: ₹<span id="grandTotal">0</span>
        </div>

        <button class="btn-wa" onclick="sendToWhatsApp()">💬 WhatsApp पर ऑर्डर भेजें</button>
        <button class="btn-sms" onclick="sendToSMS()">💬 SMS के ज़रिए भेजें</button>
    </div>

    <script>
        function calculateTotal() {
            var rows = document.querySelectorAll('.item-row');
            var total = 0;

            rows.forEach(function(row) {
                var checkbox = row.querySelector('.item-check');
                var qtyInput = row.querySelector('.qty-input');

                if (checkbox.checked) {
                    var price = parseFloat(checkbox.getAttribute('data-price'));
                    var qty = parseInt(qtyInput.value) || 1;
                    total += price * qty;
                }
            });

            document.getElementById('grandTotal').innerText = total;
            return total;
        }

        function getOrderSummary() {
            var rows = document.querySelectorAll('.item-row');
            var selectedItems = [];

            rows.forEach(function(row) {
                var checkbox = row.querySelector('.item-check');
                var qtyInput = row.querySelector('.qty-input');

                if (checkbox.checked) {
                    var name = checkbox.value;
                    var qty = parseInt(qtyInput.value) || 1;
                    var price = parseFloat(checkbox.getAttribute('data-price'));
                    selectedItems.push(name + " x " + qty + " = ₹" + (price * qty));
                }
            });

            return selectedItems;
        }

        function sendToWhatsApp() {
            var name = document.getElementById("custName").value;
            var phone = document.getElementById("custPhone").value;
            var items = getOrderSummary();
            var total = calculateTotal();

            if(name === "" || phone === "") {
                alert("कृपया पहले अपना नाम और फोन नंबर भरें!");
                return;
            }

            if(items.length === 0) {
                alert("कृपया कम से कम एक सामान चुनें!");
                return;
            }

            var ownerPhone = "917007012620"; 
            
            var text = "नमस्ते! मुझे डेयरी का सामान चाहिए।\n\n*ग्राहक का नाम:* " + name + "\n*फोन:* " + phone + "\n\n*ऑर्डर सूची:*\n- " + items.join("\n- ") + "\n\n*कुल राशि:* ₹" + total;
            var url = "https://wa.me/" + ownerPhone + "?text=" + encodeURIComponent(text);
            
            window.open(url, '_blank');
        }

        function sendToSMS() {
            var name = document.getElementById("custName").value;
            var phone = document.getElementById("custPhone").value;
            var items = getOrderSummary();
            var total = calculateTotal();

            if(name === "" || phone === "") {
                alert("कृपया पहले अपना नाम और फोन नंबर भरें!");
                return;
            }

            if(items.length === 0) {
                alert("कृपया कम से कम एक सामान चुनें!");
                return;
            }

            var ownerPhone = "7007012620";
            var text = "New Order\nName: " + name + "\nPhone: " + phone + "\nItems: " + items.join(", ") + "\nTotal: Rs." + total;
            
            var url = "sms:" + ownerPhone + "?body=" + encodeURIComponent(text);
            window.location.href = url;
        }
    </script>

</body>
</html>
