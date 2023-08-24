import vn_logo from './country_logo/vn.png'
import vanuatu_logo from './country_logo/vanuatu.png'


export function country_logo(country: string) {
    switch (country) {
        case "Vietnam":
            return vn_logo;
        case "United States":
            return us_logo;
        case "Vanuatu":
            return vanuatu_logo;
        case "Micronesia":
            return micronesia_logo;
        case "Cabo Verde":
            return cabo_verde_logo;
        case "Lesotho":
            return lesotho_logo;
        case "Cambodia":
            return cambodia_logo;
        case "Lao":
            return lao_logo;
        case "Honduras":
            return honduras_logo;
        case "Zimbabwe":
            return zimbabwe_logo;
        case "Tajikistan":
            return tajikistan_logo;
        case "Congo":
            return congo_logo;
        case "Nepal":
            return nepal_logo;
        case "Bangladesh":
            return bangladesh_logo;
        case "Nigeria":
            return nigeria_logo;
        case "Jamaica":
            return jamaica_logo;
        case "Kosovo":
            return kosovo_logo;
        case "Namibia":
            return namibia_logo;
        case "Uruguay":
            return uruguay_logo;
        case "Bulgaria":
            return bulgaria_logo;
        case "Mongolia":
            return mongolia_logo;
        case "Jordan":
            return jordan_logo;
        case "Argentina":
            return argentina_logo;
        case "Thailand":
            return thailand_logo;
        case "Brazil":
            return brazil_logo;
        case "Mexico":
            return mexico_logo;
        case "Philippines":
            return philippines_logo;
        case "Indonesia":
            return indonesia_logo;
        case "Brunei":
            return brunei_logo;
        case "Luxembourg":
            return luxembourg_logo;
        case "Malta":
            return malta_logo;
        case "Singapore":
            return singapore_logo;
        case "Switzerland":
            return switzerland_logo;
        case "Norway":
            return norway_logo;
        case "Ireland":
            return ireland_logo;
        case "New Zealand":
            return new_zealand_logo;
        case "Israel":
            return israel_logo;
        case "United Arab Emirates":
            return uae_logo;
        case "India":
            return india_logo;
        case "Russia":
            return russia_logo;
        case "France":
            return france_logo;
        case "Japan":
            return japan_logo;
        case "Germany":
            return germany_logo;
        case "United Kingdom":
            return uk_logo;
        case "Australia":
            return australia_logo;
        case "Korea":
            return korea_logo;
        default:
            return vn_logo;
            break;
    }
}