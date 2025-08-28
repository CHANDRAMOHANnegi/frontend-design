export const problems = [
  {
    "slug": "two-sum",
    "title": "Two Sum",
    "difficulty": "Easy",
    "category": "Array & Hashing",
    "link": "https://leetcode.com/problems/two-sum/",
    "description": "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. Assume exactly one solution and you may not use the same element twice.",
    "fnName": "twoSum",
    "signature": "export function twoSum(nums, target) {\n  // return [i, j]\n}",
    "tests": [
      {
        "input": {
          "nums": [
            2,
            7,
            11,
            15
          ],
          "target": 9
        },
        "output": [
          0,
          1
        ]
      },
      {
        "input": {
          "nums": [
            3,
            2,
            4
          ],
          "target": 6
        },
        "output": [
          1,
          2
        ]
      },
      {
        "input": {
          "nums": [
            3,
            3
          ],
          "target": 6
        },
        "output": [
          0,
          1
        ]
      }
    ]
  },
  {
    "slug": "valid-anagram",
    "title": "Valid Anagram",
    "difficulty": "Easy",
    "category": "Array & Hashing",
    "link": "https://leetcode.com/problems/valid-anagram/",
    "description": "Given two strings s and t, return true if t is an anagram of s, and false otherwise.",
    "fnName": "isAnagram",
    "signature": "export function isAnagram(s, t) {\n  // return true or false\n}",
    "tests": [
      {
        "input": {
          "s": "anagram",
          "t": "nagaram"
        },
        "output": true
      },
      {
        "input": {
          "s": "rat",
          "t": "car"
        },
        "output": false
      }
    ]
  },
  {
    "slug": "contains-duplicate",
    "title": "Contains Duplicate",
    "difficulty": "Easy",
    "category": "Array & Hashing",
    "link": "https://leetcode.com/problems/contains-duplicate/",
    "description": "Given an integer array nums, return true if any value appears at least twice, and return false if every element is distinct.",
    "fnName": "containsDuplicate",
    "signature": "export function containsDuplicate(nums) {\n  // return true or false\n}",
    "tests": [
      {
        "input": {
          "nums": [
            1,
            2,
            3,
            1
          ]
        },
        "output": true
      },
      {
        "input": {
          "nums": [
            1,
            2,
            3,
            4
          ]
        },
        "output": false
      }
    ]
  },
  {
    "slug": "product-of-array-except-self",
    "title": "Product of Array Except Self",
    "difficulty": "Medium",
    "category": "Array & Hashing",
    "link": "https://leetcode.com/problems/product-of-array-except-self/",
    "description": "Given an integer array nums, return an array answer such that answer[i] is the product of all elements of nums except nums[i]. You must write an algorithm that runs in O(n) time and without using division.",
    "fnName": "productExceptSelf",
    "signature": "export function productExceptSelf(nums) {\n  // return array\n}",
    "tests": [
      {
        "input": {
          "nums": [
            1,
            2,
            3,
            4
          ]
        },
        "output": [
          24,
          12,
          8,
          6
        ]
      },
      {
        "input": {
          "nums": [
            -1,
            1,
            0,
            -3,
            3
          ]
        },
        "output": [
          0,
          0,
          9,
          0,
          0
        ]
      }
    ]
  },
  {
    "slug": "valid-parentheses",
    "title": "Valid Parentheses",
    "difficulty": "Easy",
    "category": "Stack",
    "link": "https://leetcode.com/problems/valid-parentheses/",
    "description": "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    "fnName": "isValid",
    "signature": "export function isValid(s) {\n  // return true or false\n}",
    "tests": [
      {
        "input": {
          "s": "()"
        },
        "output": true
      },
      {
        "input": {
          "s": "()[]{}"
        },
        "output": true
      },
      {
        "input": {
          "s": "(]"
        },
        "output": false
      }
    ]
  },
  {
    "slug": "best-time-to-buy-and-sell-stock",
    "title": "Best Time to Buy and Sell Stock",
    "difficulty": "Easy",
    "category": "Sliding Window",
    "link": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
    "description": "Given an array prices where prices[i] is the price of a given stock on the i-th day, maximize profit by choosing a single day to buy and a different day to sell.",
    "fnName": "maxProfit",
    "signature": "export function maxProfit(prices) {\n  // return number\n}",
    "tests": [
      {
        "input": {
          "prices": [
            7,
            1,
            5,
            3,
            6,
            4
          ]
        },
        "output": 5
      },
      {
        "input": {
          "prices": [
            7,
            6,
            4,
            3,
            1
          ]
        },
        "output": 0
      }
    ]
  }
];
