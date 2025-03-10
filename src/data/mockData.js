// src/data/mockData.js
export const initialCompanies = [
  {
    id: '1',
    name: '腾讯科技',
    city: '深圳',
    address: '南山区腾讯大厦',
    tags: [
      { name: '福利好', count: 238 },
      { name: '不加班', count: 156 },
      { name: '双休', count: 198 }
    ],
    likes: 2300,
    dislikes: 123,
    salaryScreenshots: [
      { id: '1', url: '/images/salary1.jpg', timestamp: '2024-03-05' },
      { id: '2', url: '/images/salary2.jpg', timestamp: '2024-03-04' }
    ],
    reviews: [
      {
        id: '1',
        nickname: '神仙公司#1024',
        content: '团队氛围很好，leader很照顾新人，工作压力适中，性价比不错。',
        timestamp: '2024-03-05',
        likes: 23,
        dislikes: 2,
        comments: [
          {
            id: '1',
            nickname: '神仙公司#2048',
            content: '同意楼主说的，我也是这么觉得的。',
            timestamp: '2024-03-05'
          }
        ]
      }
    ]
  },
  {
    id: '2',
    name: '阿里巴巴',
    city: '杭州',
    address: '余杭区阿里巴巴园区',
    tags: [
      { name: '领导nice', count: 175 },
      { name: '福利好', count: 201 }
    ],
    likes: 1800,
    dislikes: 245,
    salaryScreenshots: [],
    reviews: []
  },
  {
    id: '3',
    name: '字节跳动',
    city: '北京',
    address: '海淀区字节跳动总部',
    tags: [
      { name: '福利好', count: 167 },
      { name: '双休', count: 145 }
    ],
    likes: 1500,
    dislikes: 178,
    salaryScreenshots: [],
    reviews: []
  }
];