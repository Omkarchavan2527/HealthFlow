

export class Footer extends Component {
  render() {
    return (
      <div className='flex flex-wrap justify-between mb-11 pl-5 text-sm md:text-lg'>
        <div>Copyright © HealthFlow. All rights reserved</div>
  <div className='flex flex-wrap gap-8 mr-20 ' >
    <img src="/home.png" alt="home" className='h-4 md:h-7'/>
    <img src="/setting.png" alt="setting" className=' h-4 md:h-7' />
    </div>
      </div>
    )
  }
}

export default Footer
