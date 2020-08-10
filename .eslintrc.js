module.exports = {
    "env": {
        "browser": true,
        "es2020": true
    },
    "extends": [
        "plugin:react/recommended",
        "airbnb",
        "prettier/@typescript-eslint",
        "plugin:prettier/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
            
        },
        "ecmaVersion": 2020,
        "sourceType": "module"
    },
    "settings": {
        "react": {
          "version": "detect" // Tells eslint-plugin-react to automatically detect the version of React to use
        },
        "import/resolver": {
            "node": {
              "extensions": [".js", ".jsx", ".ts", ".tsx"]
            }
          }
      },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx",'tsx','ts'] }],
        "import/extensions": [
            "error",
            "ignorePackages",
            {
              "js": "never",
              "jsx": "never",
              "ts": "never",
              "tsx": "never"
            }
         ],
         "import/prefer-default-export": "off",
         "jsx-a11y/label-has-for": [ 2, {
            "required": {
                "every": [ "id" ]
            }
        }]
    }
};
