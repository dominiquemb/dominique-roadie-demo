module.exports = {
  extends: [require.resolve('@backstage/cli/config/eslint.backend')],
  rules: {
    'notice/notice': 'off',
    "jest/expect-expect": [
      "error",
      {
        "assertFunctionNames": ["expect", "request.*.expect"]
      }
    ]
  }
};
