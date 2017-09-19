export class DomElementsProcessing {

    constructor() {}

    public addBloodAfterHeroKill(data: any): void {

        let battleFiled = document.getElementById('battleGround');

        let blood = document.createElement("div");
        blood.className = "hero-was-killed-blood";
        blood.style.top = `${data.positionOnPlayGroundY - 20}px`;
        blood.style.left= `${data.positionOnPlayGroundX - 10}px`;

        battleFiled.appendChild(blood);

        setTimeout(() => {
            battleFiled.removeChild(blood);
        }, 3000);
    }
    public deleteHeroElement(id: string): void {

        let heroElement = document.getElementById(id);

        if (heroElement) {
            heroElement.parentNode.parentNode.removeChild(heroElement.parentNode)
        }
    }
}