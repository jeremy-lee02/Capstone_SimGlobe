import vn_logo from './country_logo/vn.png'
import vanuatu_logo from './country_logo/vanuatu.png'
import us_logo from './country_logo/usa.png'
import micronesia_logo from './country_logo/micronesia.png'
import cabo_verde_logo from './country_logo/cape_verde.png'
import lesotho_logo from './country_logo/lesotho.png'
import cambodia_logo from './country_logo/cambodia.png'
import lao_logo from './country_logo/laos.png'
import honduras_logo from './country_logo/honduras.png'
import zimbabwe_logo from './country_logo/zimbabwe.png'
import tajikistan_logo from './country_logo/tajikistan.png'
import congo_logo from './country_logo/congo.png'
import nepal_logo from './country_logo/nepal.png'
import bangladesh_logo from './country_logo/bangladesh.png'
import jamaica_logo from './country_logo/jamaica.png'
import kosovo_logo from './country_logo/kosovo.png'
import namibia_logo from './country_logo/namibia.png'
import uruguay_logo from './country_logo/uruguay.png'
import bulgaria_logo from './country_logo/bulgaria.png'
import mongolia_logo from './country_logo/mongolia.png'
import jordan_logo from './country_logo/jordan.png'
import argentina_logo from './country_logo/argentina.png'
import thailand_logo from './country_logo/thailand.png'
import nigeria_logo from './country_logo/nigeria.png'
import brazil_logo from './country_logo/brazil.png'
import mexico_logo from './country_logo/mexico.png'
import philippines_logo from './country_logo/philippines.png'
import indonesia_logo from './country_logo/indonesia.png'
import brunei_logo from './country_logo/brunei.png'
import luxembourg_logo from './country_logo/luxembourg.png'
import malta_logo from './country_logo/malta.png'
import singapore_logo from './country_logo/singapore.png'
import switzerland_logo from './country_logo/switzerland.png'
import norway_logo from './country_logo/norway.png'
import ireland_logo from './country_logo/ireland.png'
import new_zealand_logo from './country_logo/new_zealand.png'
import israel_logo from './country_logo/israel.png'
import uae_logo from './country_logo/uae.png'
import india_logo from './country_logo/india.png'
import russia_logo from './country_logo/russia.png'
import france_logo from './country_logo/france.png'
import japan_logo from './country_logo/japan.png'
import germany_logo from './country_logo/germany.png'
import uk_logo from './country_logo/uk.png'
import australia_logo from './country_logo/australia.png'
import korea_logo from './country_logo/south_korea.png'
import colombia_logo from './country_logo/colombia.png'


export function country_logo(country: string) {
    switch (country) {
        case "Vietnam":
            return vn_logo;
        case "USA":
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
        case "Colombia":
            return colombia_logo;
        default:
            return vn_logo;
            break;
    }
}