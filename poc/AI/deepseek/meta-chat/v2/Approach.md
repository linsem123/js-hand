# Enhanced Generic JSON Templates with Detailed Defaults

Here are more comprehensive JSON templates with detailed default values and additional useful fields that can help AI generate more complete outputs:

## 1. Enhanced Account Information Template

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Detailed Account Information Template",
  "description": "Comprehensive template for user account information with defaults",
  "type": "object",
  "properties": {
    "metadata": {
      "type": "object",
      "properties": {
        "templateVersion": {
          "type": "string",
          "default": "1.2.0",
          "description": "Template version for compatibility checks"
        },
        "generatedAt": {
          "type": "string",
          "format": "date-time",
          "description": "Timestamp when this data was generated"
        },
        "source": {
          "type": "string",
          "default": "AI Generation",
          "description": "Source of this data"
        }
      },
      "required": ["templateVersion"]
    },
    "accountType": {
      "type": "string",
      "enum": ["personal", "business", "admin", "guest"],
      "default": "personal",
      "description": "Type of user account"
    },
    "accountStatus": {
      "type": "string",
      "enum": ["active", "pending", "suspended", "closed"],
      "default": "active",
      "description": "Current status of the account"
    },
    "userDetails": {
      "type": "object",
      "properties": {
        "firstName": {
          "type": "string",
          "minLength": 1,
          "description": "User's legal first name"
        },
        "lastName": {
          "type": "string",
          "minLength": 1,
          "description": "User's legal last name"
        },
        "displayName": {
          "type": "string",
          "description": "Name to display in UI (defaults to firstName + lastName)",
          "default": ""
        },
        "email": {
          "type": "string",
          "format": "email",
          "description": "Primary email address"
        },
        "secondaryEmails": {
          "type": "array",
          "items": {
            "type": "string",
            "format": "email"
          },
          "default": [],
          "description": "Additional email addresses"
        },
        "phone": {
          "type": "string",
          "pattern": "^\\+?[0-9\\s-]+$",
          "description": "Primary phone number in E.164 format"
        },
        "avatarUrl": {
          "type": "string",
          "format": "uri",
          "default": "https://example.com/avatars/default.png",
          "description": "URL to profile image"
        },
        "timezone": {
          "type": "string",
          "default": "UTC",
          "description": "IANA timezone (e.g., America/New_York)"
        },
        "locale": {
          "type": "string",
          "default": "en-US",
          "description": "BCP 47 language tag (e.g., en-US, fr-CA)"
        },
        "bio": {
          "type": "string",
          "maxLength": 500,
          "default": "",
          "description": "Short user biography"
        }
      },
      "required": ["firstName", "lastName", "email"]
    },
    "security": {
      "type": "object",
      "properties": {
        "twoFactorEnabled": {
          "type": "boolean",
          "default": false,
          "description": "Whether 2FA is enabled"
        },
        "lastLogin": {
          "type": "string",
          "format": "date-time",
          "description": "Timestamp of last successful login"
        },
        "loginHistory": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "timestamp": {
                "type": "string",
                "format": "date-time"
              },
              "ipAddress": {
                "type": "string",
                "format": "ipv4"
              },
              "device": {
                "type": "string"
              }
            }
          },
          "default": [],
          "description": "Recent login history"
        }
      }
    },
    "preferences": {
      "type": "object",
      "properties": {
        "theme": {
          "type": "string",
          "enum": ["light", "dark", "system", "high-contrast"],
          "default": "system",
          "description": "UI color theme preference"
        },
        "fontSize": {
          "type": "string",
          "enum": ["small", "medium", "large"],
          "default": "medium",
          "description": "Preferred font size"
        },
        "notifications": {
          "type": "object",
          "properties": {
            "email": {
              "type": "boolean",
              "default": true
            },
            "push": {
              "type": "boolean",
              "default": true
            },
            "sms": {
              "type": "boolean",
              "default": false
            },
            "frequency": {
              "type": "string",
              "enum": ["immediate", "daily", "weekly"],
              "default": "immediate"
            }
          },
          "default": {}
        },
        "privacy": {
          "type": "object",
          "properties": {
            "profileVisibility": {
              "type": "string",
              "enum": ["public", "connections", "private"],
              "default": "connections"
            },
            "dataSharing": {
              "type": "boolean",
              "default": false,
              "description": "Opt-in for analytics data sharing"
            }
          },
          "default": {}
        }
      },
      "default": {}
    },
    "subscriptions": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "service": {
            "type": "string",
            "description": "Name of subscribed service"
          },
          "level": {
            "type": "string",
            "description": "Subscription tier"
          },
          "status": {
            "type": "string",
            "enum": ["active", "canceled", "expired", "pending"],
            "default": "active"
          },
          "renewalDate": {
            "type": "string",
            "format": "date"
          }
        }
      },
      "default": [],
      "description": "List of service subscriptions"
    }
  },
  "required": ["metadata", "accountType", "userDetails"]
}
```

## 2. Enhanced Income Chart Template

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Detailed Income Chart Template",
  "description": "Comprehensive template for income visualization with defaults",
  "type": "object",
  "properties": {
    "metadata": {
      "type": "object",
      "properties": {
        "templateVersion": {
          "type": "string",
          "default": "2.1.0"
        },
        "dataSource": {
          "type": "string",
          "default": "Accounting System",
          "description": "Origin of the underlying data"
        },
        "currency": {
          "type": "string",
          "default": "USD",
          "description": "ISO 4217 currency code"
        },
        "exchangeRate": {
          "type": "number",
          "minimum": 0,
          "default": 1,
          "description": "Exchange rate to base currency if different"
        }
      },
      "required": ["templateVersion", "currency"]
    },
    "chartConfig": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string",
          "enum": ["bar", "line", "pie", "doughnut", "area", "radar"],
          "default": "bar",
          "description": "Chart visualization type"
        },
        "stacked": {
          "type": "boolean",
          "default": false,
          "description": "Whether to stack data series"
        },
        "timeRange": {
          "type": "string",
          "enum": ["weekly", "monthly", "quarterly", "yearly", "custom"],
          "default": "monthly"
        },
        "startDate": {
          "type": "string",
          "format": "date",
          "description": "Custom start date when timeRange is custom"
        },
        "endDate": {
          "type": "string",
          "format": "date",
          "description": "Custom end date when timeRange is custom"
        },
        "animation": {
          "type": "boolean",
          "default": true,
          "description": "Whether to enable chart animations"
        },
        "responsive": {
          "type": "boolean",
          "default": true,
          "description": "Whether chart should resize with container"
        },
        "aspectRatio": {
          "type": "number",
          "minimum": 0.5,
          "maximum": 3,
          "default": 1.77,
          "description": "Width/height ratio (16:9 ≈ 1.77)"
        },
        "colorPalette": {
          "type": "string",
          "enum": ["default", "pastel", "vibrant", "monochrome", "custom"],
          "default": "default",
          "description": "Color scheme for the chart"
        },
        "customColors": {
          "type": "array",
          "items": {
            "type": "string",
            "pattern": "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
          },
          "description": "Custom color hex values when palette is custom"
        }
      },
      "required": ["type", "timeRange"]
    },
    "datasets": {
      "type": "array",
      "minItems": 1,
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "description": "Unique identifier for the dataset"
          },
          "label": {
            "type": "string",
            "description": "Display name for the dataset"
          },
          "type": {
            "type": "string",
            "enum": ["revenue", "expense", "profit", "tax", "other"],
            "default": "revenue"
          },
          "data": {
            "type": "array",
            "items": {
              "type": "number",
              "minimum": 0
            },
            "description": "Numerical data points"
          },
          "currency": {
            "type": "string",
            "default": "USD",
            "description": "Currency for this dataset if different from metadata"
          },
          "unit": {
            "type": "string",
            "default": "currency",
            "enum": ["currency", "percentage", "count"],
            "description": "Measurement unit for values"
          },
          "precision": {
            "type": "integer",
            "minimum": 0,
            "maximum": 8,
            "default": 2,
            "description": "Decimal places to display"
          },
          "showInLegend": {
            "type": "boolean",
            "default": true
          },
          "hidden": {
            "type": "boolean",
            "default": false,
            "description": "Initially hide this dataset"
          },
          "metadata": {
            "type": "object",
            "description": "Additional dataset-specific information"
          }
        },
        "required": ["label", "data"]
      }
    },
    "labels": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Category labels for x-axis or pie segments"
    },
    "axes": {
      "type": "object",
      "properties": {
        "x": {
          "type": "object",
          "properties": {
            "title": {
              "type": "string",
              "default": "Period",
              "description": "X-axis label"
            },
            "gridLines": {
              "type": "boolean",
              "default": true
            },
            "stacked": {
              "type": "boolean",
              "default": false
            }
          }
        },
        "y": {
          "type": "object",
          "properties": {
            "title": {
              "type": "string",
              "default": "Amount",
              "description": "Y-axis label"
            },
            "min": {
              "type": "number",
              "description": "Minimum value to display"
            },
            "max": {
              "type": "number",
              "description": "Maximum value to display"
            },
            "beginAtZero": {
              "type": "boolean",
              "default": true
            },
            "gridLines": {
              "type": "boolean",
              "default": true
            },
            "stacked": {
              "type": "boolean",
              "default": false
            }
          }
        }
      }
    },
    "tooltips": {
      "type": "object",
      "properties": {
        "enabled": {
          "type": "boolean",
          "default": true
        },
        "mode": {
          "type": "string",
          "enum": ["point", "nearest", "index", "dataset", "x", "y"],
          "default": "index"
        },
        "currencySymbol": {
          "type": "string",
          "default": "$"
        },
        "showPercentage": {
          "type": "boolean",
          "default": false
        }
      }
    },
    "annotations": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "enum": ["line", "box", "label", "point"],
            "default": "line"
          },
          "value": {
            "type": ["number", "string"],
            "description": "Value or position for the annotation"
          },
          "label": {
            "type": "string",
            "description": "Text to display with annotation"
          },
          "color": {
            "type": "string",
            "pattern": "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$",
            "default": "#FF0000"
          }
        }
      },
      "default": [],
      "description": "Chart annotations like averages or targets"
    },
    "interactions": {
      "type": "object",
      "properties": {
        "hover": {
          "type": "boolean",
          "default": true
        },
        "click": {
          "type": "boolean",
          "default": true,
          "description": "Allow clicking on chart elements"
        },
        "drag": {
          "type": "boolean",
          "default": false,
          "description": "Allow panning the chart"
        },
        "zoom": {
          "type": "boolean",
          "default": false,
          "description": "Allow zooming the chart"
        }
      }
    }
  },
  "required": ["metadata", "chartConfig", "datasets", "labels"]
}
```

## Key Enhancements in These Templates

1. **Metadata Sections**:
   - Added version control
   - Data source tracking
   - Generation timestamps

2. **Comprehensive Defaults**:
   - Sensible defaults for all optional fields
   - Default color schemes and styles
   - Standard measurement units

3. **Enhanced Validation**:
   - Minimum/maximum values
   - String patterns (for emails, colors, etc.)
   - Array length constraints

4. **Detailed Configuration**:
   - Multiple chart interaction options
   - Comprehensive theming support
   - Advanced annotation capabilities

5. **Internationalization Support**:
   - Currency codes (ISO 4217)
   - Locale settings
   - Timezone awareness

These templates provide AI with much more context about your expectations and the structure of valid outputs, while giving you more control over the generated visualization and data presentation.