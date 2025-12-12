# Results System — نموذج جاهز للتشغيل

متطلبات:
- Node.js >= 18
- Microsoft SQL Server (MSSQL) محلي أو على الشبكة

تشغيل backend:
1. انتقل إلى مجلد backend
2. انسخ .env.example إلى .env وعدّل القيم
   - عند استخدام MSSQL: تأكد من قيم DB_HOST, DB_USER (مثلا sa), DB_PASSWORD
3. npm install
4. node seed/create-admin.js (إن أردت إنشاء admin افتراضي) أو ضع القيم SEED_ADMIN_NAME و SEED_ADMIN_PASS في .env
5. npm run dev

تشغيل frontend:
1. انتقل إلى مجلد frontend
2. npm install
3. npm start

ملاحظات:
- للتعامل مع 427,734 سجل: أنصح بإضافة index على name_student وتهيئة pagination.
- في MSSQL استخدم CREATE INDEX لتسريع البحث.
- الأمان: خزّن كلمات المرور مشفرة بـ bcrypt. استخدم HTTPS في الإنتاج.
- الطباعة: يتم توليد PDF على الخادم وفتح الناتج في المتصفح للطباعة.

- ملاحظة: سكربت seed/create-admin.js يقرأ SEED_ADMIN_NAME و SEED_ADMIN_PASS من ملف .env إذا رغبت في تعيين بيانات مدير مخصصة قبل التشغيل.
