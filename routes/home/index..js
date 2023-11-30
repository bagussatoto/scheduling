import { Component, h } from 'preact';
import style from './style'
import Schedule from '../../api/schedule';
import { Link } from 'preact-router';

import Button from '../../components/button'
import HStack from '../../components/hstack'
import Spacer from '../../components/spacer'
import Container from '../../components/container'
import Card from '../../components/card'

import ModalSchedule from '../../components/modules/ModalSchedule';
import dayDict from '../../dayDict';


const DayCard = ({ title, desc, items, hasVal }) => (
  <div>
    <Card data-cy="card-day">
      <h3 data-cy={`card-title-${title}`}>{title} </h3>
      <p
        data-cy={`card-desc-${title}`}
        class={hasVal ? style.not_empty : ''}
      >
        {desc}
      </p>
    </Card>
    <br />
    {items && items.length > 0 && (
      <Card>
        {items.map(item => (
          <div key={item.title} data-cy={`${title}-${item.title}`} class={style.day_item}>{item.title}</div>
        ))}
      </Card>
    )}
  </div>
)

class Home extends Component {
  state = {
    openModal: false,
    schedules: [],
  }
  componentDidMount() {
    this.fetchSchedules()
  }

  fetchSchedules = async () => {
    try {
      const { data: { data } } = await Schedule.all();
      const schedules = Object.entries(data).map(([key, val]) => ({
        title: dayDict[key],
        desc: val > 0 ? `${val} Mata Kuliah` : 'Belum ada mata kuliah',
        hasVal: val > 0,
        key,
      }))
      const sched = await Promise.all(schedules.map(async ({ key, ...rest }) => {
        try {
          const { data: { data: items } } = await Schedule.details({ day: key });
          return {
            ...rest,
            key,
            items,
          };
        } catch (err) {
          if (err.response.data.status === 'Not Found') {
            return {
              ...rest,
              key,
              items: [],
            }
          }
        }
      }))
      this.setState({ schedules: sched });
    } catch (err) {
      const defaultSchedules = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'].map(item => ({
        title: item,
        key: item,
        desc: 'Tidak ada jadwal kuliah',
        hasVal: false,
        items: [],
      }))
      this.setState({ schedules: defaultSchedules });
    }
  }

  addSchedule = async (form) => {
    await Schedule.add({
      title: form.matkul,
      day: form.day,
    });
    await this.fetchSchedules();
    this.setState({ openModal: false })
  }

  render(_, { openModal, schedules }) {
    return (
      <Container>
        <HStack>
          <Spacer />
          <Button onClick={() => this.setState({ openModal: true })} data-cy="btn-create-schedule">
              + Buat Jadwal Kuliah
          </Button>
        </HStack>
        <HStack>
          {schedules.map(sched => (
            <Link class={style.day} href={`/schedule/${sched.key}`} key={sched.key}>
              <DayCard {...sched} />
            </Link>
          ))}
        </HStack>
        <ModalSchedule
          isOpen={openModal}
          onClose={() => this.setState({ openModal: false })}
          onSubmit={this.addSchedule}
        />
      </Container>
    )
  }
}

export default Home;
