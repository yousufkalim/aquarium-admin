let baseUrl = 'http://localhost:5000/api';

if (window.location.host === 'aquarium-admin-dev.falconweb.app') {
  baseUrl = 'https://aquarium-api-dev.falconweb.app/api';
} else if (
  window.location.host === 'aquarium-admin-qa.falconweb.app'
) {
  baseUrl = 'https://aquarium-api-qa.falconweb.app/api';
} else if (
  window.location.host === 'aquarium-admin-staging.falconweb.app'
) {
  baseUrl = 'https://aquarium-api-staging.falconweb.app/api';
} else if (
  window.location.host === 'aquarium-admin-prod.falconweb.app/'
) {
  baseUrl = 'https://aquarium-api-prod.falconweb.app/api';
}

module.exports = { baseUrl };
