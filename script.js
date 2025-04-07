let isAdminLoggedIn = false; // Admin girişi durumunu takip etmek için bir değişken

// Admin girişi kontrolü
function checkLogin(event) {
    event.preventDefault(); // Formun otomatik submit edilmesini engelle

    const adminUsername = "baba";
    const adminPassword = "baba31";

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === adminUsername && password === adminPassword) {
        isAdminLoggedIn = true; // Giriş başarılı
        document.getElementById('loginContainer').style.display = 'none'; // Giriş formunu gizle
        document.getElementById('updateContainer').style.display = 'block'; // Admin panelini göster
    } else {
        alert("❌ Hatalı kullanıcı adı veya şifre");
    }
}

// Webhook gönderme fonksiyonu
async function sendWebhook() {
    // Admin girişinin doğruluğunu kontrol et
    if (!isAdminLoggedIn) {
        alert("❌ Lütfen giriş yapın!");
        return; // Admin girişi yapılmadıysa, fonksiyonu durdur
    }

    const productName = document.getElementById('productName').value;
    const productDescription = document.getElementById('productDescription').value;
    const productImage = document.getElementById('productImage').files[0]; // Resim dosyası
    const productVideo = document.getElementById('productVideo').files[0]; // Video dosyası
    const webhookURL = 'https://discord.com/api/webhooks/1357653799035998410/UZX8Jm9Ws3JrvSyRoXsOq_x6yXcGXY1ajvx-aWy2W6gBoMnX5GpZIR5VKWaMwJQWTlJl';

    let contentMessage = "@everyone @here 📢 **Yeni Güncelleme Yayında! Kebabsavar31 firma** 🚀";

    const payload = {
        username: "Kebabin kölesiyim",
        content: contentMessage, // @everyone, @here ve mesaj içeriği
        embeds: [
            {
                title: productName,
                description: productDescription,
                color: 0xFFFFFF, // Beyaz renk
                footer: {
                    text: 'kebabsavar31 Güncellemeleri',
                    icon_url: 'https://cdn.discordapp.com/attachments/1283104142495322123/1283116353624211468/baba3.jpg?ex=67f0bef9&is=67ef6d79&hm=e78da81640389da5fc5eb8382a0b6aca3c92b0b8d01e8468dc58870ff988121a&'
                },
                thumbnail: {
                    url: 'https://cdn.discordapp.com/attachments/1283104142495322123/1283116353624211468/baba3.jpg?ex=67f0bef9&is=67ef6d79&hm=e78da81640389da5fc5eb8382a0b6aca3c92b0b8d01e8468dc58870ff988121a&'
                },
                author: {
                    name: 'kebabsavar31',
                    icon_url: 'https://cdn.discordapp.com/attachments/1283104142495322123/1283116353624211468/baba3.jpg?ex=67f0bef9&is=67ef6d79&hm=e78da81640389da5fc5eb8382a0b6aca3c92b0b8d01e8468dc58870ff988121a&'
                }
            }
        ]
    };

    let formData = new FormData();
    formData.append("payload_json", JSON.stringify(payload));

    if (productImage) {
        formData.append("file", productImage); // Resim dosyasını ekle
    }

    if (productVideo) {
        formData.append("file", productVideo); // Video dosyasını ekle
    }

    try {
        const response = await fetch(webhookURL, {
            method: 'POST',
            body: formData
        });

        const responseData = await response.json().catch(() => null);

        if (response.ok) {
            alert("✅ Güncelleme başarıyla Discord kanalına gönderildi!");
        } else {
            console.error("❌ Hata Detayı:", responseData);
            alert("❌ Bir hata oluştu. Discord hatası: " + (responseData?.message || "Bilinmeyen hata"));
        }
    } catch (error) {
        console.error("❌ Hata:", error);
        alert("Webhook gönderilirken hata oluştu.");
    }
}
