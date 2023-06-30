import { vn_logo } from "../../assets"

type Props = {}

const TeamInfo = (props: Props) => {
  return (
    <div className='text-white w-[700px] bg-[#282C35] py-2 pl-3'>
        <div className='flex justify-between'>
            <div className='font-semibold text-lg basis-[50%]'>
                Member:
                <ul className='font-normal text-sm list-disc ml-9 '>
                    <li>Le Trung Tin</li>
                    <li>Luu Duy Toan</li>
                    <li>Hoang Ngoc Anh Duc</li>
                    <li>Ngo Nhat Minh</li>
                </ul>
            </div>
            <div className='basis-[50%] flex gap-3 items-start'>
                <p className='font-semibold text-lg '>Country: <span className='font-normal'>VietNam</span></p>
                <img src= {vn_logo} width={40} height={40} className="object-contain mt-1" />
            </div>
        </div>
        <div className="flex justify-between text-lg font-semibold mt-3">
            <p className="basis-1/2">Start: <span className="font-normal">17/06/2023 12:00 PM </span></p>
            <p className="basis-1/2">End: <span className="font-normal">18/06/2023 12:00 PM </span></p>
        </div>
    </div>
  )
}

export default TeamInfo