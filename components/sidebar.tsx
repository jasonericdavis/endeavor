import Link from 'next/link';

export default ({className}:any) => {
    return (
        <div className={className}>
            <ul>
                <li><Link href="/"><a>Dashboard</a></Link></li>
                <li><Link href="global"><a>Global</a></Link></li>
                <li><Link href="pages"><a>Pages</a></Link></li>
                <li><Link href="help"><a>Help</a></Link></li>
            </ul>
        </div>
    )
}