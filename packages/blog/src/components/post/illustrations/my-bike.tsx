'use client'

import {PropsWithChildren, ComponentProps} from 'react'

import Dot from '@/components/icons/Dot'
import PostFigure from '../PostFigure'
import styles from './my-bike.module.scss'


interface IProps {
    items: Array<{
        date: string,
        item: string,
        images: string[]
        description: string,
        equipments: Record<string, string>
    }>
}

export default function MyBikeTimeline ({items}: IProps) {
    return (
        <>
            <section>
                <h2>配件表</h2>
                <MyBikeSetUp items={items} />
            </section>

            <section>
                <h2>时间线</h2>
                <Timeline>
                    {items.map(({date, item, description, images}) => <TimelineItem
                        key={date}
                        date={date}
                        title={item}
                        content={description}
                        images={images}
                    />)}
                </Timeline>
            </section>
        </>
    )
}

function MyBikeSetUp ({items}: IProps) {
    return (
        <table>
            <tbody>
                {Object.entries(collectEquipments(items)).map(([equipment, model]) => (
                    <tr key={equipment}>
                        <td>{equipment}</td>
                        <td>{model}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

function collectEquipments (items: IProps['items']) {
    return items.reduce((r, {equipments}) => Object.assign(r, equipments), {} as IProps['items'][0]['equipments'])
}

function Timeline ({children, ...props}: PropsWithChildren<ComponentProps<'ol'>>) {
    return (
        <ol className={styles['timeline']} {...props}>{children}</ol>
    )
}

function TimelineItem ({date, title, content, images, children, ...props}: PropsWithChildren<ComponentProps<'li'> & {
    date?: string
    title?: string
    content?: string
    images?: string[]
}>) {
    return (
        <li className={styles['timeline__item']} {...props}>
            <TimelineMark />
            <div className={styles['timeline__item-content-wrapper']}>
                {children || (
                    <>
                        {!!date && <TimelineDate date={date} />}
                        {!!title && <TimelineTitle title={title} />}
                        {!!content && <TimelineContent content={content} />}
                        {!!images?.length && <TimelineImages images={images} />}
                    </>
                )}
            </div>
        </li>
    )
}

function TimelineMark () {
    return (
        <div className={styles['timeline__item-icon']}>
            <Dot />
        </div>
    )
}

function TimelineDate ({date}: {date: string}) {
    return <div className={styles['timeline__item-date']}>{date}</div>
}

function TimelineTitle ({title}: {title: string}) {
    return <div className={styles['timeline__item-title']}>{title}</div>
}

function TimelineContent ({content}: {content: string}) {
    return <div className={styles['timeline__item-content']}>{content}</div>
}

function TimelineImages ({images}: {images: string[]}) {
    return (
        <ul className={styles['timeline__item-images']}>
            {images.map(image => (
                <li><PostFigure key={image} src={image} alt="" /></li>
            ))}
        </ul>
    )
}
