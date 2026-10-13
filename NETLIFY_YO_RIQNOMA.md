# Alifbo olami — Netlify uchun

## 1. Saytni yuklash
Netlify Dashboard → Add new project → Deploy manually bo‘limini oching. ZIP faylni avval chiqarib, **alifbo_netlify_tayyor** papkasini Netlify Drop oynasiga tashlang.

**Muhim:** Oddiy qo‘lda fayl tashlash (drag-and-drop) usulida Netlify Functions to‘g‘ri joylanmasligi mumkin. Ishonchli usul: loyihani GitHub repository’ga yuklab, Netlify’ga **Import from Git** orqali ulash. Bunda netlify.toml bo‘yicha function avtomatik deploy bo‘ladi.

## 2. API kaliti (kerak!)
Netlify → Project configuration → Environment variables → Add a variable:
- NEURONAI_API_KEY = yangi, maxfiy NeuronAI API kalitingiz
- NEURONAI_VOICE_ID = kamron (ixtiyoriy)

Netlify Function uchun variable scope = Functions (yoki All) bo‘lsin. Keyin **Deploys → Trigger deploy → Deploy site**.

## 3. Tekshirish
Saytda A harfini bosing. API kaliti sozlanmaguncha ovoz ishlamaydi; dizayn va o‘yinlar ishlaydi.

API kalitini index.html / netlify.toml / GitHub repository ichiga joylashtirmang. Oldin chatda oshkor qilingan kalitni bekor qilib, yangisini yarating.

**Eslatma:** Serverless funksiya hech qanday disk cache yaratmaydi; tez-tez bosish NeuronAI balansidan xarajat qilishi mumkin. Barqaror xarajat uchun oldindan WAV fayllar yaratib joylashtirish lozim.
