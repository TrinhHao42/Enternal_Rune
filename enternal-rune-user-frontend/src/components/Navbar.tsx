'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export const Navbar = () => {
    const [open, setOpen] = useState(false)
    return (
        <header className="flex items-center justify-between z-30 px-6 md:px-16 lg:px-24 xl:px-32 py-6 w-full border-b border-gray-200">
            <Link href="/">
                <Image src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/dummyLogo/prebuiltuiDummyLogo.svg" alt="Logo" width={100} height={100} />
            </Link>
            <nav id="menu"
                className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:overflow-hidden items-center justify-center max-md:h-full ${open ? 'max-md:w-full' : 'max-md:w-0'} transition-[width] max-md:bg-white/50 backdrop-blur flex-col md:flex-row flex gap-8 text-gray-900 text-sm font-semibold`}>
                <Link className="hover:text-blue-600" href="#">
                    Sản phẩm
                </Link>
                <Link className="hover:text-blue-600" href="#">
                    Câu chuyện khách hàng
                </Link>
                <Link className="hover:text-blue-600" href="#">
                    Bảng giá
                </Link>
                <Link className="hover:text-blue-600" href="#">
                    Tài liệu
                </Link>
                <button id="closeMenu" className="md:hidden text-gray-600" onClick={() => setOpen(false)}>
                    <X className="w-6 h-6" />
                </button>
            </nav>
            <div className="hidden md:flex space-x-4">
                <Link className="text-blue-600 bg-blue-100 px-5 py-2 rounded-full text-sm font-medium hover:bg-blue-200 transition"
                    href="#">
                    Đăng nhập
                </Link>
                <Link className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition"
                    href="#">
                    Đăng ký
                </Link>
            </div>
            <button id="openMenu" className="md:hidden text-gray-600" onClick={() => setOpen(true)}>
                <Menu className="w-6 h-6" />
            </button>
        </header>
    )
}