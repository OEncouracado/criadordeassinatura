import React, { useState, useRef } from 'react';
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';
import html2canvas from 'html2canvas';
// import logo from './logo.png'; // Substitua pelo caminho correto do logo

const EmailSignatureGenerator = () => {
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const signatureRef = useRef(null);

    const handlePhoneChange = (e) => {
        const inputPhone = e.target.value;
        setPhone(inputPhone);
    };

    const formatPhoneNumber = (phoneNumber) => {
        const cleaned = ('' + phoneNumber).replace(/\D/g, '');

        // Verifica se o número possui o nono dígito
        const hasNinthDigit = cleaned.length === 11;

        if (hasNinthDigit) {
            const match = cleaned.match(/^(\d{2})(\d{1})(\d{4})(\d{4})$/);
            if (match) {
                return `(${match[1]}) ${match[2]} ${match[3]}-${match[4]}`;
            }
        } else {
            const match = cleaned.match(/^(\d{2})(\d{4})(\d{4})$/);
            if (match) {
                return `(${match[1]}) ${match[2]}-${match[3]}`;
            }
        }

        return phoneNumber;
    };

    const handleCopy = () => {
        const signatureHtml = `
        <div>
        <p> -- </p>
            <table style="background-color: rgb(230, 230, 230);">
                <tr>
                    <td style="vertical-align:center; padding-right:10px;">
                        <img src="https://hospitalemcor.com.br/static/media/emcorsfundo.91cc186954b579b3ff82.png" alt="Logo" style="max-width:250px; margin-left:3rem; margin-right:3rem"/>
                    </td>
                    <td style="vertical-align:top; border-left:1px solid #000; padding-left:10px; padding-right:5rem;">
                        <h3><strong>${name}</strong></h3>
                        <p><em>${position}</em></p>
                        <p><a href="tel:${phone}" style="text-decoration:none; color:unset;"><img src="https://img.icons8.com/?size=100&id=9659&format=png&color=000000" alt="Phone Icon" style="vertical-align: middle;max-height:1.5rem" /> ${formatPhoneNumber(phone)}</a></p>
                        <p><a href="mailto:${email}" style="text-decoration:none; color:unset;"><img src="https://img.icons8.com/?size=100&id=53388&format=png&color=000000" alt="Mail Icon" style="vertical-align: middle;max-height:1.5rem" /> ${email}</a></p>
                        <p><a href="https://www.hospitalemcor.com.br" style="text-decoration:none; color:unset;" target="_blank"><img src="https://img.icons8.com/?size=100&id=3685&format=png&color=000000" alt="Globe Icon" style="vertical-align: middle;max-height:1.5rem" /> www.hospitalemcor.com.br</a></p>
                    </td>
                </tr>
            </table>
        </div>`;

        navigator.clipboard.writeText(signatureHtml)
            .then(() => {
                alert('Assinatura copiada para a área de transferência!');
            })
            .catch((err) => {
                console.error('Erro ao copiar a assinatura: ', err);
            });
    };

    const handleDownload = () => {
        const signature = signatureRef.current;
        if (signature) {
            html2canvas(signature, { useCORS: true }).then((canvas) => {
                const link = document.createElement('a');
                link.href = canvas.toDataURL('image/png');
                link.download = 'signature.png';
                link.click();
            });
        }
    };

    return (
        <Container className="mt-5">
            <h1>Gerador de Assinatura de Email</h1>
            <Form>
                <Form.Group controlId="formName">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Digite seu nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formPosition" className="mt-3">
                    <Form.Label>Posição</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Digite sua posição"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formPhone" className="mt-3">
                    <Form.Label>Telefone(Ramal ou Celular somente números)</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Digite seu telefone"
                        value={phone}
                        onChange={handlePhoneChange}
                    />
                </Form.Group>

                <Form.Group controlId="formEmail" className="mt-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Digite seu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Card className="my-5" id="signature" ref={signatureRef}>
                    <Card.Body>
                        <div>
                            <Row>
                                <Col xs={4} className='col1 d-flex justify-content-center align-items-center'>
                                    <img className='logo' src="https://hospitalemcor.com.br/static/media/emcorsfundo.91cc186954b579b3ff82.png" alt="Logo" style={{ maxWidth: '100%' }} />
                                </Col>
                                <Col>
                                    <div className="bg-dark" style={{ width: ".1rem", height: "100%" }}></div>
                                </Col>
                                <Col xs={7} className='d-flex flex-column align-items-start'>
                                    <h3 className='text-left'><strong>{name}</strong></h3>
                                    <p className='text-left'><em>{position}</em></p>
                                    <p className='text-left'><a style={{ textDecoration: "none", color: "unset" }} href={`tel:${phone}`}><img src="https://img.icons8.com/?size=100&id=9659&format=png&color=000000" alt="Phone Icon" style={{ verticalAlign: "middle", color: "#000", maxHeight: "1.5rem" }} /> {formatPhoneNumber(phone)}</a></p>
                                    <p className='text-left'><a style={{ textDecoration: "none", color: "unset" }} href={`mailto:${email}`}><img src="https://img.icons8.com/?size=100&id=53388&format=png&color=000000" alt="Mail Icon" style={{ verticalAlign: "middle", color: "#000", maxHeight: "1.5rem" }} /> {email}</a></p>
                                    <p className='text-left'><a style={{ textDecoration: "none", color: "unset" }} href="https://www.hospitalemcor.com.br" target="_blank" rel="noopener noreferrer"><img src="https://img.icons8.com/?size=100&id=3685&format=png&color=000000" alt="Globe Icon" style={{ verticalAlign: "middle", color: "#000", maxHeight: "1.5rem" }} /> www.hospitalemcor.com.br</a></p>
                                </Col>
                            </Row>
                        </div>
                    </Card.Body>
                </Card>
                <div className="mt-3 mb-5">
                    <Button variant="primary" onClick={handleCopy} title='Copia o html da assinatura para a área de transferência' className="me-3">
                        Copiar Assinatura
                    </Button>
                    <Button variant="secondary" onClick={handleDownload} title='Baixa a versão de imagem da assinatura' >
                        Baixar Assinatura
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default EmailSignatureGenerator;
