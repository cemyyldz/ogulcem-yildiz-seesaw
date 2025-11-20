# Tahterevalli Simülasyonu (Seesaw Simulation)

Bu proje, verilen gereksinimlere uygun şekilde **tamamen saf JavaScript, HTML ve CSS** kullanılarak geliştirilmiş etkileşimli bir tahterevalli simülasyonudur. Kullanıcılar, tahterevallinin üzerine tıklayarak rastgele ağırlıklara sahip nesneler bırakabilir, sistem gerçekçi tork hesaplarına göre eğimi yeniden belirler ve tüm durum yerel depolamada saklanır.

---
## Github Pages Linki
https://cemyyldz.github.io/ogulcem-yildiz-seesaw/

## Düşünce Sürecim ve Tasarım Kararlarım
Bu projede benden istenen özelliklere odaklanarak basit ama sağlam bir mantıkla ilerlemeye çalıştım. Gereksinimleri tek tek sıralayıp her birini aşamalı şekilde tamamlayacak bir yol haritası oluşturdum. Geliştirme adımlarım şu şekildeydi:

1. **Proje iskeletini oluşturdum.**
   - HTML yapı, temel CSS dosyaları ve JavaScript dosyasını hazırladım.

2. **Tahterevalli ve pivot görsellerini tasarladım.**
   - Orta noktadan dönebilecek şekilde stil verdim.

3. **Ağırlık oluşturma ve tıklama olayını kodladım.**
   - Kullanıcının tıkladığı konuma göre rastgele ağırlık (1–10 kg) eklenmesini sağladım.

4. **Tork hesaplama ve açı güncelleme fonksiyonunu yazdım.**
   - Ağırlık × uzaklık formülüyle sağ/sol torku hesaplayıp eğimi ±30° ile sınırladım.

5. **Tahterevallinin dönüşünü daha yumuşak hale getirdim.**
   - CSS transition ile daha doğal görünmesini sağladım.

6. **Ağırlıkların LocalStorage’a kaydedilmesini sağladım.**
   - Sayfa yenilense bile tüm nesnelerin, açı değerinin ve geçmiş listesinin korunmasını sağladım.

7. **Reset butonu ekledim.**
   - Tüm ağırlıkların ve açının sıfırlanması için bir temizleme fonksiyonu yazdım.

8. **Tıklama olayının yalnızca tahterevalli üzerinde geçerli olmasını sağladım.**
   - Arka plana tıklayınca ağırlık eklenmesinin önüne geçtim.

9. **Ağırlık kutularının görünümünü düzenledim.**
   - Renk, yazı, konum ve şekil stilini iyileştirdim.

10. **UI iyileştirmeleri ve genel CSS düzenlemelerini tamamladım.**
    - Sağ/sol ağırlık göstergesi, son eklenen ağırlık paneli gibi ek arayüz öğeleri ekledim.

11. **Bonus özellikler ekledim:**
    - Ağırlık göstergesi
    - Reset butonu
    - Son eklenen ağırlık bilgi paneli
    - Daha yumuşak animasyonlar
    - Nesne düşme sesi efekti

---

## Karşılaştığım Ödünler ve Sınırlamalar
Bu projede bazı tercihler ve sınırlamalar doğal olarak ortaya çıktı:

- **Tork hesaplamasında yalnızca yatay (X ekseni) mesafe dikkate alındı.** 
  Dikey konum önemsiz olduğu için fiziksel model sadeleştirildi.

- **Responsive tasarım temel seviyede uygulandı.** 
  Çoğu cihazda düzgün çalışıyor ancak her ekran boyutunda mükemmel uyum garanti edilmedi.

- **Açı hesabı doğrusal olarak sınırlandı (±30°).**
  Gerçek fizik simülasyonlarında açısal ivme ve sönüm gibi ek parametreler bulunur; bu proje gereksinimleri doğrultusunda sade tutuldu.

---

## Yapay Zekâ Desteği
Projede yer alan kodun **tamamı tarafımdan yazılmıştır**; ana algoritma, DOM işlemleri, tork mantığı ve tüm uygulama akışı bana aittir.

Yapay zekâ desteği yalnızca aşağıdaki sınırlı konularda kullanılmıştır:

- Küçük çaplı mantık doğrulamaları
- CSS tarafında renk paleti fikirleri ve hover efekt önerileri

Hiçbir ana fonksiyon, tork hesaplaması, event akışı veya program yapısı yapay zekâ tarafından oluşturulmamıştır.

---

## Sonuç
Bu proje, kullanıcı etkileşimi, fiziksel simülasyon prensipleri, animasyonlu dönüş hareketi, localStorage yönetimi ve UI tasarımı gibi pek çok konsepti birleştirerek tamamladığım bir uygulamadır. Gereksinimlerin tümünü karşılamasının yanı sıra, ekstra özelliklerle deneyimi zenginleştirmeye çalıştım.

