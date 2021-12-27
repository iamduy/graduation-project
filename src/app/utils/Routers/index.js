const Routers = {
  STAFF: '/quan-tri-vien',
  STUDENT: '/sinh-vien',
  LOGIN: '/dang-nhap',
  REGISTER: '/dang-ky',
  FORGOT_PASSWORD: '/quen-mat-khau',
  CHART: {
    URL: '/quan-tri-vien/bieu-do',
    NAME: 'Biểu đồ'
  },
  RESET_PASSWORD: '/dat-lai-mat-khau',
  PROJECTS: '/quan-tri-vien/quan-ly-du-an',

  BUILDING: {
    URL: '/quan-tri-vien/toa-nha',
    NAME: 'Quản lý toà nhà',
    ADD_BUILDING: {
      URL: '/quan-tri-vien/toa-nha/them-moi',
      NAME: 'Thêm mới toà nhà'
    },
    DETAIL: {
      URL: '/quan-tri-vien/toa-nha/thong-tin-toa-nha',
      NAME: 'Thông tin toà nhà'
    },
    FLOOR: {
      URL: '/quan-tri-vien/toa-nha/tang',
      NAME: 'Tầng'
    }
  },

  ROOMS: {
    URL: '/quan-tri-vien/danh-sach-phong',
    NAME: 'Danh sách phòng ở',
  }
  ,
  RENTAL_MANAGEMENT: {
    HISTORY: {
      URL: '/quan-tri-vien/lich-su-thanh-ly',
      NAME: 'Lịch sử thanh lý',
    },
    FEE: {
      URL: '/quan-tri-vien/quan-ly-thu-phi',
      NAME: 'Quản lý thu phí',
    },
    CONTRACT: {
      URL: '/quan-tri-vien/quan-ly-hop-dong',
      NAME: 'Quản lý hợp đồng',
    },

    UTILITY_BILLS: {
      URL: '/quan-tri-vien/quan-ly-hoa-don-dien-nuoc',
      NAME: 'Quản lý hoá đơn điện nước',
    },
  },
  PROFILE: {
    STAFF: {
      URL: '/quan-tri-vien/thong-tin-ca-nhan',
      NAME: 'Thông tin cá nhân',
      CHILD: [
        {
          URL: '/quan-tri-vien/thong-tin-ca-nhan/doi-mat-khau',
          NAME: 'Đổi mật khẩu',
        },
        {
          URL: '/quan-tri-vien/thong-tin-ca-nhan/cap-nhat',
          NAME: 'Cập nhật thông tin cá nhân',
        },
      ],
    },
    STUDENT: {
      URL: '/sinh-vien/thong-tin-ca-nhan',
      NAME: 'Thông tin cá nhân',
      CHILD: [
        {
          URL: '/sinh-vien/thong-tin-ca-nhan/doi-mat-khau',
          NAME: 'Đổi mật khẩu',
        },
        {
          URL: '/sinh-vien/thong-tin-ca-nhan/chi-tiet',
          NAME: 'Cập nhật thông tin cá nhân',
        },
      ],
    },
  },



  // quản lý sinh viên
  MANAGE_STUDENT: {
    TYPE_ANNOUNCE: {
      URL: '/quan-tri-vien/quan-ly-sinh-vien/loai-thong-bao',
      NAME: 'Quản lý loại thông báo'
    },
    INTERACT: {
      URL: '/quan-tri-vien/quan-ly-sinh-vien/tuong-tac',
      NAME: 'Quản lý tương tác',
    },
    LIST: {
      URL: '/quan-tri-vien/quan-ly-sinh-vien/danh-sach',
      NAME: 'Quản lý sinh viên thuê',
    },
    NOTICE: {
      URL: '/quan-tri-vien/quan-ly-sinh-vien/thong-bao',
      NAME: 'Quản lý thông báo',
    },
    UPDATE: {
      URL: '/quan-tri-vien/quan-ly-sinh-vien/cap-nhat-thong-bao',
      NAME: 'Cập nhật thông báo',
    },
    CREATE: {
      URL: '/quan-tri-vien/quan-ly-sinh-vien/tao-moi-thong-bao',
      NAME: 'Tạo mới thông báo',
    },
  },

  // quản lý danh mục
  OPERATIONAL: {
    MAINTENANCE: {
      URL: 'quan-ly-danh-muc/bao-tri',
      NAME: 'Quản lý bảo trì sửa chữa',
    },
    TASK: {
      URL: 'quan-ly-danh-muc/cong-viec',
      NAME: 'Quản lý công việc',
    },
  },

  // QUẢN LÝ TÀI SẢN
  ASSETS: {
    ASSET: {
      URL: '/quan-tri-vien/quan-ly-tai-san/tai-san',
      NAME: 'Quản lý tài sản',
    },
    PRODUCER: {
      URL: 'quan-ly-tai-san/nha-san-xuat',
      NAME: 'Quản lý nhà sản xuất',
    },
    TYPE_ASSET: {
      URL: 'quan-ly-tai-san/loai-tai-san',
      NAME: 'Quản lý loại tài sản',
    },
    UNIT_ASSET: {
      URL: 'quan-ly-tai-san/don-vi',
      NAME: 'Quản lý đơn vị tài sản',
    },
  },

  // quản lý doanh thu
  REVENUE: {
    LIST_RECEIPTS: {
      URL: 'quan-ly-doanh-thu/danh-sach-thu',
      NAME: 'Quản lý danh sách thu',
    },
    RECEIPTS: {
      URL: 'quan-ly-doanh-thu/phieu-thu',
      NAME: 'Quản lý phiếu thu',
    },
    RECEIPTS_REASON: {
      URL: 'quan-ly-doanh-thu/ly-do-thu',
      NAME: 'Lý do thu',
    },
  },

  // quản lý báo cáo
  REPORT: {
    LIST_REPORT: {
      URL: 'quan-ly-bao-cao',
      NAME: 'Danh sách báo cáo',
    },
    RENTAL_STATUS: {
      URL: 'hien-trang-thue',
      NAME: 'Hiện trạng thuê',
    },
    TENANTS: {
      URL: 'khach-thue',
      NAME: 'Danh sách sinh viên',
    },
    HISTORY_CONTRACT: {
      URL: 'lich-su-hop-dong',
      NAME: 'Danh sách hợp đồng',
    },
    COLLECT: {
      URL: 'bao-cao-thu',
      NAME: 'Danh sách thu',
    },
    INVENTORY: {
      URL: 'bao-cao-tai-san',
      NAME: 'Danh sách tài sản',
    },
    REPORT_MAINTENANCE: {
      URL: 'bao-tri',
      NAME: 'Bảo trì',
    },
    SERVICE_MONTH: {
      URL: 'dich-vu-thang',
      NAME: 'Danh sách dịch vụ tháng'
    },
    SERVICE_CONTRACT: {
      URL: 'dich-vu-khac',
      NAME: 'Danh sách dịch vụ khác'
    }
  },
  // cài đặt
  SETTING_USER: {
    USER: {
      URL: 'cai-dat/nhan-vien',
      NAME: 'Quản lý nhân viên',
    },
    TYPE_USER: {
      URL: 'cai-dat/chuc-vu',
      NAME: 'Quản lý chức vụ',
    },
    DELEGATION: {
      URL: 'cai-dat/phan-quyen',
      NAME: 'Quản lý phân quyền'
    },
  },



  // module của sinh viên
  CONTRACT_STUDENT: {
    URL: '/sinh-vien/hop-dong-thue',
    NAME: 'Thông tin hợp đồng'
  },
  INVOICE_STUDENT: {
    URL: '/sinh-vien/hoa-don-thu',
    NAME: 'Thông tin hoá đơn'
  },
  NOTICE_STUDENT: {
    URL: '/sinh-vien/thong-bao',
    NAME: 'Thông báo và điều khoản'
  }
};
export default Routers;
