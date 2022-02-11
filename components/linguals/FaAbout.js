import Link from "next/link";
import { FaGithub, FaCode, FaPhone } from "react-icons/fa";

export default function FaAbout() {
  return (
    <article
      className="bg-secondary text-secondary py-10 px-5"
      style={{
        direction: "rtl",
      }}
    >
      <h4 className="text-primary text-2xl text-center mb-4">
        فروشگاه اینترنتی کامل، ساخته شده با نکست جی اس
      </h4>
      <div className="flex flex-col lg:w-[60%] mx-auto justify-center text-right">
        <section className="my-8 w-3/4 mx-auto border-t-[1px] border-b-[1px] border-secondarycont py-3">
          <p className="text-primary text-xl mb-2">ویژگی های سایت</p>
          <ul className="leading-8 mr-3">
            <li>PWA</li>
            <li>
              دارای پنل مدیریت با قابلتیت ساخت،ویرایش،خوانش و حذف
              محصولات،سفارشات و دیگر ادمین ها
            </li>
            <li className="text-sm">
              <Link href="/admin/login">
                <a className="text-accent">برو به پنل کاربری</a>
              </Link>{" "}
            </li>
            <li className="text-xs mb-3">
              برای ورود به پنل کاربری از این ایمیل admin@exm.com  و از این رمز  Abc123  استفاده کنید
            </li>
            <li>سرویس ورود خروج بر پایه JWT</li>
            <li>تم روشن و تاریک</li>
            <li>دوزبانه (انگلیسی / فارسی)</li>
            <li>تصویر و فونت بهینه سازی شده</li>
            <li>طراحی واکنشگرا</li>
          </ul>
        </section>
        <section className="mb-8 w-3/4 mx-auto text-sm text-primary leading-7">
          <p className="flex">
            <a
              href="https://github.com/a-meraji/nextommerce"
              target={"_blank"}
              className="flex"
            >
              <FaGithub className="mt-1.5" width={20} />
              <span className="text-accent mx-1.5">سورس کد</span>
            </a>
            <span>در گیت هاب</span>
          </p>
          <p className="flex">
            <FaCode className="mt-1.5" width={20} />{" "}
            <span className="mr-1.5"> برنامه نویسی از امین معراجی</span>
          </p>
          <Link href="/contact">
            <a className="flex">
              <FaPhone className="mt-1.5" width={20} />{" "}
              <span className="mr-1.5"> تماس با من</span>
            </a>
          </Link>
          <p className="text-third text-sm">
            تمامی لینک های تصاویر از دموی فروشگاه ورسل تهیه شده است
          </p>
        </section>
      </div>
    </article>
  );
}
