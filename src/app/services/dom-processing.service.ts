export class DomElementsProcessing {

    constructor() {}

    public addBloodAfterHeroKill(data: any): void {

        let battleFiled = document.getElementById('battleGround');
        // get rand number 1..5 (5 blood pictures types)
        let bloodIndex = Math.floor(Math.random() * (5 - 1) + 1);
        let blood = document.createElement("div");

        blood.className = `hero-was-killed-blood-${bloodIndex}`;
        blood.style.top = `${data.positionOnPlayGroundY - 20}px`;
        blood.style.left= `${data.positionOnPlayGroundX - 10}px`;

        battleFiled.appendChild(blood);

        setTimeout(() => {
            battleFiled.removeChild(blood);
        }, 5000);
    }
    public deleteHeroElement(id: string): void {

        let heroElement = document.getElementById(id);

        if (heroElement) {
            heroElement.parentNode.parentNode.removeChild(heroElement.parentNode)
        }
    }
}